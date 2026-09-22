#!/usr/bin/env python3
"""Extrae las propiedades del section `Docs · <Componente>` de un dump de get_metadata.

Uso:
    python parse_docs.py <archivo-metadata> [--html]

<archivo-metadata> puede ser:
  - el JSON que persiste la herramienta get_metadata cuando la salida es grande, o
  - un .txt con el XML pegado tal cual.

Sin --html imprime JSON con {componente, subtitulo, props:[{nombre,tipo,descripcion}]}.
Con --html imprime el bloque <div class="ty-table-wrap">...</div> listo para pegar.
"""
import sys, os, re, json, html

# Windows: la consola suele ser cp1252 y rompe las tildes al imprimir
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

TIPOS = {
    'VARIANT': 'Variant',
    'TEXT': 'Text',
    'BOOLEAN': 'Boolean',
    'INSTANCE': 'Instance',
    'INSTANCE SWAP': 'Instance',
    'SLOT': 'Slot',
}
# Un tipo no listado cae al fallback .title(), que resuelve bien los de una palabra.


def cargar(path):
    raw = open(path, encoding='utf-8').read()
    if raw.lstrip().startswith(('[', '{')):
        data = json.loads(raw)
        if isinstance(data, list):
            return '\n'.join(b.get('text', '') for b in data if isinstance(b, dict))
        if isinstance(data, dict):
            if 'text' in data:
                return data['text']
            return '\n'.join(
                b.get('text', '') for b in data.get('content', []) if isinstance(b, dict)
            )
    return raw


def limpiar(s):
    s = html.unescape(s)
    # las comillas rectas de Figma se normalizan a comillas angulares del kit
    s = re.sub(r'"([^"]+)"', r'«\1»', s)
    return ' '.join(s.split())


def extraer(xml):
    m = re.search(r'<section\b[^>]*name="Docs · ([^"]+)"[^>]*>(.*?)</section>', xml, re.S)
    if not m:
        raise SystemExit(
            'No encontré un <section name="Docs · ...">. '
            'Revisa que el nodeId apunte a la página del componente, no a la matriz.'
        )
    componente, cuerpo = limpiar(m.group(1)), m.group(2)

    subtitulo = ''
    props = []
    # cada propiedad vive en un <frame name="Frame · X"> con 3 <text> hijos
    for fm in re.finditer(r'<frame\b[^>]*name="(Frame · [^"]*)"[^>]*>(.*?)</frame>', cuerpo, re.S):
        nombre_frame, interior = fm.group(1), fm.group(2)
        textos = re.findall(r'<text\b[^>]*name="([^"]*)"', interior)
        if 'encabezado leyenda' in nombre_frame:
            if len(textos) >= 2:
                subtitulo = limpiar(textos[1])
            continue
        if len(textos) < 3:
            print(f'  aviso: «{nombre_frame}» tiene {len(textos)} textos, se omite', file=sys.stderr)
            continue
        nombre, tipo, desc = textos[0], textos[1], textos[2]
        props.append({
            'nombre': limpiar(nombre),
            'tipo': TIPOS.get(limpiar(tipo).upper(), limpiar(tipo).title()),
            'descripcion': limpiar(desc),
        })

    if not props:
        raise SystemExit('Encontré el section Docs pero ninguna propiedad. Revisa la estructura.')
    return {'componente': componente, 'subtitulo': subtitulo, 'props': props}


def a_html(d):
    filas = '\n'.join(
        '                  <tr><td><strong>{n}</strong></td><td><code>{t}</code></td>'
        '<td class="ty-muted">{d}</td></tr>'.format(
            n=html.escape(p['nombre']), t=html.escape(p['tipo']), d=html.escape(p['descripcion'])
        )
        for p in d['props']
    )
    return (
        '            <p>{sub}</p>\n'
        '            <div class="ty-table-wrap">\n'
        '              <table class="ty-table">\n'
        '                <thead>\n'
        '                  <tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>\n'
        '                </thead>\n'
        '                <tbody>\n{filas}\n'
        '                </tbody>\n'
        '              </table>\n'
        '            </div>'
    ).format(sub=html.escape(d['subtitulo']), filas=filas)


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args:
        raise SystemExit(__doc__)
    if not os.path.exists(args[0]):
        raise SystemExit(f'No existe el archivo: {args[0]}')
    d = extraer(cargar(args[0]))
    if '--html' in sys.argv:
        print(a_html(d))
    else:
        print(json.dumps(d, ensure_ascii=False, indent=2))
