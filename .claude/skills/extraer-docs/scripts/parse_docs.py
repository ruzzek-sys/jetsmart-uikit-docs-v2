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
    'INSTANCE_SWAP': 'Instance',
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
    # Figma entrecomilla con " o con ' (rectas o curvas), según quién escribió la ficha;
    # el kit usa «». Todos los patrones exigen el par, así que un apóstrofo suelto no se toca.
    s = re.sub(r'“([^”]+)”', r'«\1»', s)
    s = re.sub(r'‘([^’]+)’', r'«\1»', s)
    s = re.sub(r'"([^"]+)"', r'«\1»', s)
    s = re.sub(r"'([^']+)'", r'«\1»', s)
    return ' '.join(s.split())


def extraer(xml):
    """Devuelve una lista con una entrada por cada section `Docs · …` de la página.

    Una misma página puede documentar varios componentes relacionados —Avatar y
    Avatar Selector, por ejemplo— así que siempre devuelve lista, aunque traiga uno.
    """
    secciones = re.findall(
        r'<section\b[^>]*name="Docs · ([^"]+)"[^>]*>(.*?)</section>', xml, re.S
    )
    if not secciones:
        raise SystemExit(
            'No encontré ningún <section name="Docs · ...">. '
            'Revisa que el nodeId apunte a la página del componente, no a la matriz.'
        )
    return [_extraer_seccion(limpiar(n), c) for n, c in secciones]


def _extraer_seccion(componente, cuerpo):
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
        raise SystemExit(
            f'El section «Docs · {componente}» no lista ninguna propiedad. Revisa la estructura.'
        )
    return {'componente': componente, 'subtitulo': subtitulo, 'props': props}


def a_html(d, con_titulo=False):
    filas = '\n'.join(
        '                  <tr><td><strong>{n}</strong></td><td><code>{t}</code></td>'
        '<td class="ty-muted">{d}</td></tr>'.format(
            n=html.escape(p['nombre']), t=html.escape(p['tipo']), d=html.escape(p['descripcion'])
        )
        for p in d['props']
    )
    # con varios componentes en la página, cada tabla se rotula con su nombre
    encabezado = (
        '            <h3>{c}</h3>\n'.format(c=html.escape(d['componente'])) if con_titulo else ''
    )
    return (
        encabezado
        + '            <p>{sub}</p>\n'
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
        print('\n'.join(a_html(x, con_titulo=len(d) > 1) for x in d))
    else:
        print(json.dumps(d, ensure_ascii=False, indent=2))
