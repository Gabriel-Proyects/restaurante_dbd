from pathlib import Path
import math, random, json, re
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import pypdfium2 as pdfium
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
TMP = Path(__file__).resolve().parent
OUT = ROOT / 'output/pdf/Banquete_del_Ente_Dead_by_Daylight.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
SOURCE = Path('C:/Users/JoseG/Downloads/Presentación-Banquete_del_Ente (1).pdf')
texts = json.loads((TMP/'source_text.json').read_text(encoding='utf-8'))
for name, f in [('Body','arial.ttf'),('Bold','arialbd.ttf'),('Display','impact.ttf'),('Mono','consola.ttf')]:
    pdfmetrics.registerFont(TTFont(name, 'C:/Windows/Fonts/'+f))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')

W,H=960,540
BG='#0A0E10'; PANEL='#141C20'; LINE='#354146'; WHITE='#EEEDE6'; MUTED='#AEBAB9'; RED='#E5514C'; DARKRED='#612B2D'; GOLD='#C6A977'
c=canvas.Canvas(str(OUT),pagesize=(W,H))
c.setTitle('El Banquete del Ente | Diseño inspirado en Dead by Daylight')
c.setAuthor('Salvador, Diego Hurtado, Gabriel')
c.setSubject('Proyecto final · Plan de negocios 2025 · Etapa 1 & Etapa 2')
checks=[]

def rect(x,y,w,h,fill,stroke=None):
    c.setFillColor(HexColor(fill)); c.setStrokeColor(HexColor(stroke or fill)); c.setLineWidth(.6)
    c.rect(x,H-y-h,w,h,fill=1,stroke=bool(stroke))

def line(x1,y1,x2,y2,color=LINE,width=1):
    c.setStrokeColor(HexColor(color)); c.setLineWidth(width); c.line(x1,H-y1,x2,H-y2)

def poly(points,color,stroke=None,width=1):
    p=c.beginPath(); p.moveTo(points[0][0],H-points[0][1])
    for x,y in points[1:]: p.lineTo(x,H-y)
    p.close(); c.setFillColor(HexColor(color)); c.setStrokeColor(HexColor(stroke or color)); c.setLineWidth(width)
    c.drawPath(p,fill=1,stroke=bool(stroke))

def txt(s,x,y,size=13,font='Body',color=WHITE):
    s=s.replace('–','-').replace('—','-').replace('$N=300$','N=300')
    c.setFillColor(HexColor(color)); c.setFont(font,size); c.drawString(x,H-y-size*.83,s)
    checks.append((c.getPageNumber(),s,x,y,pdfmetrics.stringWidth(s,font,size),size))

def right(s,x,y,size=11,font='Body',color=MUTED):
    txt(s,x-pdfmetrics.stringWidth(s,font,size),y,size,font,color)

def para(s,x,y,w,size=13,color=MUTED,font='Body',maxh=200):
    s=s.replace('–','-').replace('—','-').replace('$N=300$','N=300')
    st=ParagraphStyle('body',fontName=font,fontSize=size,leading=size*1.4,textColor=HexColor(color),spaceAfter=0)
    p=Paragraph(s,st); aw,ah=p.wrap(w,maxh)
    assert ah<=maxh, (c.getPageNumber(),s,ah,maxh)
    p.drawOn(c,x,H-y-ah)
    checks.append((c.getPageNumber(),re.sub('<[^>]+>','',s),x,y,w,ah))
    return ah

def label(s,x,y,color=RED,size=10): txt(s,x,y,size,'Bold',color)

def panel(x,y,w,h,accent=False):
    rect(x,y,w,h,PANEL,LINE)
    if accent: rect(x,y,3,h,RED)
    line(x+w-17,y,x+w,y,RED,1.4); line(x+w,y,x+w,y+17,RED,1.4)

def tally(x,y,scale=1,color=WHITE):
    # Five irregular, tapering survival tally marks.
    for i in range(4):
        dx=i*13*scale
        poly([(x+dx+6*scale,y),(x+dx+10*scale,y+7*scale),(x+dx+5*scale,y+57*scale),(x+dx+1*scale,y+65*scale),(x+dx,y+12*scale)],color)
    poly([(x-8*scale,y+44*scale),(x+59*scale,y+16*scale),(x+56*scale,y+26*scale),(x-5*scale,y+50*scale)],color)

def diamond(x,y,size=34,color=LINE):
    poly([(x,y-size),(x+size,y),(x,y+size),(x-size,y)],PANEL,color)

def eye(x,y,scale=1):
    c.setStrokeColor(HexColor(RED)); c.setLineWidth(1.8*scale)
    p=c.beginPath();p.moveTo(x-23*scale,H-y);p.curveTo(x-8*scale,H-y+19*scale,x+8*scale,H-y+19*scale,x+23*scale,H-y);p.curveTo(x+8*scale,H-y-19*scale,x-8*scale,H-y-19*scale,x-23*scale,H-y);c.drawPath(p)
    c.setFillColor(HexColor(RED));c.circle(x,H-y,7*scale,fill=1,stroke=0)
    c.setFillColor(HexColor(PANEL));c.circle(x,H-y,3*scale,fill=1,stroke=0)

def forest(seed=17,hero=False):
    rng=random.Random(seed)
    rect(0,0,W,H,BG)
    # Mist built with translucent vector bands, behind all content.
    c.saveState()
    for j in range(30):
        c.setFillColor(HexColor('#71817E'));c.setFillAlpha(.009 if not hero else .015)
        c.ellipse(200-j*11,H-450-j*2,1120+j*8,H-140+j*4,stroke=0,fill=1)
    c.restoreState()
    for i in range(24):
        x=rng.uniform(0,960); width=rng.uniform(3,15); top=rng.uniform(-100,150)
        col='#10191C' if not hero else '#172226'
        poly([(x-width/2,540),(x-width*.33,top),(x+width*.14,top-40),(x+width,540)],col)
        for j in range(3):
            yy=rng.uniform(80,390);direction=rng.choice([-1,1]);dx=rng.uniform(20,85)*direction
            poly([(x,yy+26),(x+dx,yy-35),(x+dx*.55,yy),(x+width*.4,yy+49)],col)
    c.saveState();c.setFillAlpha(.63 if hero else .84);rect(0,0,960,540,BG);c.restoreState()
    # Entity-like tendrils and scratches at the edges.
    for x,sgn in [(0,1),(960,-1)]:
        poly([(x,510),(x+sgn*31,433),(x+sgn*8,465),(x+sgn*22,382),(x+sgn*3,424)],'#35403E')
    for j in range(3): line(870+j*15,16,842+j*15,111,DARKRED,2)

def footer(n,custom=None):
    line(40,497,920,497,LINE,.65)
    if custom is None:
        t=texts[n-1].splitlines()[-1]
        marker='EL BANQUETE DEL ENTE / PROYECTO FINAL'
        tail=t.replace(marker,'').strip()
        txt(marker,40,511,7.4,'Bold',MUTED)
    else: tail=custom;txt('EL BANQUETE DEL ENTE / PROYECTO FINAL',40,511,7.4,'Bold',MUTED)
    right(tail,875,511,7,'Body',MUTED)
    txt(f'{n:02}',899,506,16,'Display',RED)

def base(n,title=None):
    forest(n)
    ls=texts[n-1].splitlines()
    label(ls[0],40,27,size=10)
    heading=title or ls[1]
    size=min(29,850/pdfmetrics.stringWidth(heading,'Display',1))
    txt(heading,40,51,size,'Display')
    para(escape(ls[2]),40,96,864,12.2,maxh=40)
    footer(n)

def end(): c.showPage()

# 01 - Cover
forest(3,True)
label('PROYECTO FINAL · PLAN DE NEGOCIOS 2025',42,30,size=10)
right('ETAPA 1 & ETAPA 2 COMPLETAS',916,30,10,'Bold',WHITE)
# Large atmospheric hook and campfire, drawn as vectors.
c.saveState();c.setStrokeColor(HexColor('#5B6763'));c.setLineWidth(8)
p=c.beginPath();p.moveTo(833,540);p.lineTo(810,357);p.curveTo(783,330,796,296,819,297);p.curveTo(842,299,847,326,828,333);c.drawPath(p)
c.restoreState()
tally(695,163,2.3,'#CED4CC')
for i in range(8):
    c.saveState();c.setFillAlpha(.022);c.setFillColor(HexColor(RED));c.ellipse(660-i*6,50-i*4,830+i*6,115+i*4,fill=1,stroke=0);c.restoreState()
line(703,452,791,434,'#826A57',7);line(705,434,790,453,'#826A57',7)
poly([(721,439),(710,414),(735,420),(741,381),(757,410),(771,399),(778,437)],RED)
poly([(739,440),(738,424),(749,410),(759,441)],GOLD)
txt('EL BANQUETE',40,147,71,'Display')
txt('DEL ENTE',40,223,81,'Display',RED)
para('Restaurante temático de supervivencia y terror gamer',44,320,525,18,WHITE)
label('SLOGAN OFICIAL:',44,375,MUTED,9)
txt('COMER · JUGAR · SOBREVIVIR',44,396,21,'Bold')
line(42,465,918,465,LINE)
label('Equipo',44,481,MUTED,9)
txt('Salvador, Diego Hurtado, Gabriel',44,499,14,'Bold')
right('RESUMEN EJECUTIVO PARA EVALUACIÓN',916,503,8,'Bold',MUTED)
end()

# 02 - Roadmap
base(2)
for x,num,tag,title,items in [
    (40,'ETAPA 1','VALIDACIÓN','Viabilidad y Números',[('Justificación','Necesidad insatisfecha.'),('Factibilidad','Técnica, comercial y legal.'),('Mercado & Frecuencia','Target y muestra N=300.'),('Finanzas','Costos, fondeo 50/50 y retorno.')]),
    (500,'ETAPA 2','DESPLIEGUE','Operación e Identidad',[('Identidad','Misión, visión, logo y slogan.'),('Estrategia','Metas SMART y promociones AIDA.'),('Operación','Horarios y proceso de 13 minutos.'),('Planta & Equipo','Croquis 2D y organigrama.')])]:
    panel(x,151,420,305,True);label(num,x+23,173,size=12);right(tag,x+397,175,9,'Mono',MUTED)
    txt(title,x+23,208,25,'Display')
    for j,(a,b) in enumerate(items):
        para(f'<b>{escape(a)}:</b> {escape(b)}',x+23,258+j*43,374,13,WHITE,maxh=39)
line(465,303,492,303,RED,1.5);poly([(492,303),(484,298),(484,308)],RED)
end()

# 03 - Audience, retaining the original portrait.
base(3)
doc=pdfium.PdfDocument(str(SOURCE)); im=doc[2].render(scale=2).to_pil()
im.crop((120,320,620,716)).save(TMP/'portrait.png')
panel(40,151,258,311)
c.drawImage(str(TMP/'portrait.png'),40,H-151-204,258,204,mask='auto')
label('MERCADO OBJETIVO',57,374,size=9);txt('ANDREA, 24',57,394,25,'Display')
para('Universitaria · Trabajo medio tiempo',57,428,225,11.4,maxh=33)
panel(321,151,599,128,True)
para('“La oferta gastronómica cercana es rápida, pero completamente genérica y olvidable.”',341,171,557,18,WHITE,'Bold',maxh=75)
para('<b>Oportunidad:</b> Vacío de propuestas temáticas e interactivas para jóvenes de 18 a 30 años.',341,292,556,14,WHITE,maxh=65)
for x,k,h,b in [(321,'QUÉ BUSCA','Gasto Predecible','Ticket promedio accesible.'),(524,'QUÉ COMPARTE','Experiencia Lúdica','Dinámicas de supervivencia.'),(727,'QUÉ EXIGE','Servicio Veloz','Entrega en 13 minutos.')]:
    panel(x,369,193,93);label(k,x+13,382,size=8.8);txt(h,x+13,402,16,'Display');para(b,x+13,430,169,10.5,maxh=29)
end()

# 04 - Feasibility
base(4)
cards=[('COMERCIAL','Demanda comprobada','Alta afluencia de jóvenes consumidores de gaming y ocio inmersivo.'),('TÉCNICA','Cocina de ensamble','Línea estandarizada de preparación en 6 min con mermas acotadas.'),('OPERATIVA','Protocolo 13 minutos','Comandas automáticas vía KDS y rotación sin fricción en sala.'),('LEGAL & PI','Marca registrada propia','Cero pago de regalías; cumplimiento normativo sanitario y comercial.')]
for i,(h,sub,b) in enumerate(cards):
    x=40+i*224;panel(x,165,208,289)
    diamond(x+44,211,25);txt(f'0{i+1}',x+30,198,26,'Display',RED)
    txt(h,x+18,256,24,'Display');para(sub,x+18,298,172,13,WHITE,'Bold',maxh=45)
    para(b,x+18,351,172,12.5,maxh=90)
end()

# 05 - Frequency table
base(5)
xs=[40,173,301,430,563,920]
headers=['FRANJA HORARIA','FREC. ABSOLUTA (fi)','FREC. RELATIVA (hi)','FREC. ACUMULADA (Fi)','COMPORTAMIENTO OBSERVADO']
rect(40,151,880,44,'#293235')
for i,h in enumerate(headers):txt(h,xs[i]+11,169,8.6,'Bold')
rows=[('11:00 -12:00','15','5.0%','5.0%','Apertura y comensales tempranos'),('12:00 -15:00','108','36.0%','41.0%','Pico 1: Almuerzo ágil y recambio veloz'),('15:00 -17:00','27','9.0%','50.0%','Valle operativo y reposición de estaciones'),('17:00 -19:00','36','12.0%','62.0%','Cafetería gamer y grupos de estudio'),('19:00 -22:00','99','33.0%','95.0%','Pico 2: Experiencia nocturna y retos en mesa'),('22:00 -23:00','15','5.0%','100.0%','Última ronda y comanda de postres')]
for j,row in enumerate(rows):
    yy=195+j*42;highlight=j in (1,4)
    rect(40,yy,880,42,'#2C2022' if highlight else (PANEL if j%2==0 else '#192226'))
    if highlight:rect(40,yy,3,42,RED)
    for i,v in enumerate(row):txt(v,xs[i]+11,yy+15,11.6 if i<4 else 10.8,'Bold' if highlight else 'Body',WHITE if not highlight else '#F4B1A4')
line(40,459,920,459,RED)
label('MUESTRA: N = 300 ENCUESTAS EFECTIVAS',40,472,MUTED,8)
right('PATRÓN DE CONSUMO BIMODAL COMPROBADO (69% EN PICOS)',920,472,8,'Bold',RED)
end()

# 06 - Original demand curve, including labels from the embedded chart.
base(6)
label('CURVA DE DEMANDA HORARIA (%)',40,147,MUTED,10)
panel(40,171,880,207)
for yy in (205,249,294,337):line(63,yy,901,yy,'#293439',.6)
points=[(70,317),(207,218),(344,290),(481,326),(618,247),(755,204),(891,305)]
poly([(70,348)]+points+[(891,348)],'#40262A')
for a,b in zip(points,points[1:]):line(*a,*b,RED,2.7)
for xx,yy in [points[1],points[5]]:
    c.setFillColor(HexColor(WHITE));c.circle(xx,H-yy,4,fill=1,stroke=0)
labels=['11:00','13:00 (Pico 1: 92%)','15:00','17:00 (Valle: 30%)','19:00','21:00 (Pico Máx: 100%)','23:00']
for j,((xx,yy),lab) in enumerate(zip(points,labels)):
    tw=pdfmetrics.stringWidth(lab,'Bold',9);txt(lab,xx-tw/2,358,9,'Bold',RED if j in (1,5) else MUTED)
for x,h,b in [(40,'12:00 -15:00 · ALMUERZO ÁGIL','Despacho continuo y alta rotación en mesas.'),(493,'19:00 -22:00 · EXPERIENCIA SOCIAL','Ticket promedio elevado y dinámicas de grupo.')]:
    panel(x,399,427,69,True);label(h,x+15,413,WHITE,11);para(b,x+15,437,398,11.5,maxh=24)
end()

# 07 - Costs
base(7)
panel(40,152,408,314,True);label('INVERSIÓN INICIAL (CAPEX)',58,173,size=10)
txt('$1.0M MXN',58,198,40,'Display');line(58,249,430,249,LINE)
capex=[('Adecuación temática & obra','42% ($420k)'),('Equipamiento & tecnología','31% ($310k)'),('Capital de trabajo (3 meses)','19% ($190k)'),('Marketing & permisos','8% ($80k)')]
for j,(a,b) in enumerate(capex):
    yy=267+j*38;txt(a,58,yy,11.5);right(b,430,yy,11.5,'Bold',RED);line(58,yy+27,430,yy+27,LINE,.5)
para('Desembolso para puesta a punto preoperativa.',58,432,370,10.5,maxh=26)
panel(468,152,452,314);label('COSTOS OPERATIVOS (OPEX)',486,173,size=10);right('MENSUAL',902,173,10,'Mono')
opex=[('Costos Fijos (Renta, Nómina base, Luz, Gas)','$185,000'),('Costos Variables (Insumos alimentos/bebidas)','32% s/venta'),('Empaques, mermas y comisiones POS','5% s/venta'),('Mantenimiento y software temático','$15,000')]
for j,(a,b) in enumerate(opex):
    yy=213+j*49;para(a,486,yy,288,11.5,WHITE,maxh=36);right(b,902,yy+7,11.5,'Bold',WHITE);line(486,yy+41,902,yy+41,LINE,.5)
para('Margen de contribución estimado del <b>63%.</b>',486,432,415,11.5,RED,maxh=25)
end()

# 08 - Financial chart
base(8)
label('INGRESOS MENSUALES VS. PUNTO DE EQUILIBRIO ($300K)',40,145,MUTED,9)
right('Ingresos proyectados',726,145,9,'Bold',RED);right('Punto de Equilibrio',920,145,9,'Body',MUTED)
panel(40,169,880,186)
months=[1,3,6,9,12];vals=[180,250,340,410,480];xp=[88,281,474,667,860]
yp=lambda v:333-(v-150)*.43
c.saveState();c.setDash(3,4);line(70,yp(300),896,yp(300),MUTED,1);c.restoreState()
pts=list(zip(xp,[yp(v) for v in vals]))
for a,b in zip(pts,pts[1:]):line(*a,*b,RED,2.7)
for xx,yy in pts:c.setFillColor(HexColor(WHITE));c.circle(xx,H-yy,3.5,fill=1,stroke=0)
labs=['Mes 1 ($180k)','Mes 3 ($250k)','Mes 6: Breakeven ($340k)','Mes 9 ($410k)','Mes 12 ($480k)']
for xx,s in zip(xp,labs):txt(s,xx-pdfmetrics.stringWidth(s,'Bold',10)/2,369,10,'Bold',RED if '6:' in s else MUTED)
panel(40,405,431,68,True);label('FUENTES DE FINANCIAMIENTO',56,417,size=9)
txt('$500k Propio / $500k Crédito',56,441,15,'Bold');right('50 / 50',450,434,25,'Display',RED)
panel(491,405,429,68,True);label('RECUPERACIÓN DE INVERSIÓN',507,417,size=9)
txt('18 - 20 MESES',507,437,28,'Display');right('PAYBACK COMPLETO',903,449,9,'Bold',MUTED)
end()

# 09 - Identity
base(9)
panel(40,151,285,319,True)
diamond(182,225,47);eye(182,225,1.35)
txt('EL BANQUETE',86,287,34,'Display');txt('DEL ENTE',117,324,34,'Display',RED)
txt('Logotipo & Sello Oficial',115,365,11,'Body',MUTED)
line(62,393,303,393,LINE);label('SLOGAN DE GUERRA:',62,410,MUTED,9)
txt('COMER · JUGAR · SOBREVIVIR',62,435,13,'Bold')
for yy,h,b in [(151,'MISIÓN','Convertir una comida cotidiana en una experiencia temática accesible, ágil y memorable para comunidades universitarias y profesionales.'),(317,'VISIÓN 2029','Consolidar un formato replicable y abrir tres sedes rentables, reconocidas por servicio veloz, narrativa propia y comunidad leal.')]:
    panel(348,yy,572,153);label(h,370,yy+21,size=12);para(b,370,yy+55,525,16,WHITE,maxh=88)
end()

# 10 - Five pillars
base(10)
pillars=[('AGILIDAD','13 minutos como estándar no negociable.'),('CALIDAD','Recetas blindadas y porciones exactas.'),('INMERSIÓN','Cada rincón y platillo cuenta lore.'),('COMUNIDAD','Dinámicas grupales de supervivencia.'),('DISCIPLINA','Control sistemático de mermas y tiempos.')]
for j,(h,b) in enumerate(pillars):
    xx=40+j*179;panel(xx,166,164,294);txt(f'0{j+1}',xx+15,182,55,'Display',RED)
    line(xx+15,258,xx+149,258,LINE);txt(h,xx+15,280,20,'Display');para(b,xx+15,325,134,13,WHITE,maxh=105)
end()

# 11 - SMART goals
base(11)
smart=[('VOLUMEN SEMANAL','≥ 350','Tickets por semana','Meta al cierre del mes 3.'),('VELOCIDAD DE SERVICIO','≤ 13′','Pedido a entrega en mesa','En 90% de órdenes desde mes 2.'),('RETENCIÓN Y COMUNIDAD','≥ 30%','Clientes recurrentes','Meta al cierre del mes 6.')]
for j,(h,n,b,t) in enumerate(smart):
    xx=40+j*298;panel(xx,169,284,286,j==1);label(h,xx+19,194,size=10)
    txt(n,xx+19,237,49,'Bold',RED if j==1 else WHITE)
    para(b,xx+19,321,245,16,WHITE,'Bold',maxh=50);line(xx+19,384,xx+265,384,LINE)
    para(t,xx+19,405,244,12,maxh=37)
end()

# 12 - AIDA
base(12)
funnel=[('1 · ATENCIÓN','Clips Virales','TikToks y activaciones en campus.'),('2 · INTERÉS','Menú + Lore','Platillos bautizados con mitología.'),('3 · DESEO','Retos en Mesa','Desafíos de supervivencia grupal.'),('4 · ACCIÓN','Reserva WhatsApp','Bot con beneficios a escuadrones.')]
for j,(h,a,b) in enumerate(funnel):
    xx=40+224*j;panel(xx,155,208,148,j==3);label(h,xx+16,174,size=10);txt(a,xx+16,205,20,'Display');para(b,xx+16,247,176,12,maxh=45)
for xx,h,b in [(40,'PROMOCIÓN 01 · RETO SEMANAL DEL ENTE','Desafío grupal contrarreloj: la mesa ganadora obtiene postre temático y ranking en redes.'),(491,'PROMOCIÓN 02 · PASAPORTE DE VISITAS','Fidelización por sellos: la 5ta visita desbloquea una comida gratis y acceso al menú secreto.')]:
    panel(xx,329,429,134,True);label(h,xx+17,350,size=9.8);para(b,xx+17,384,395,13.5,WHITE,maxh=70)
end()

# 13 - Schedule
base(13)
panel(40,151,296,316,True);label('APERTURA AL PÚBLICO',61,177,size=10)
txt('MARTES A DOMINGO',61,229,29,'Display');txt('11:00 - 23:00 HRS',61,283,30,'Display',RED)
line(61,345,315,345,LINE);para('<b>Lunes:</b> Mantenimiento técnico, limpieza profunda y descanso de personal.',61,367,250,13,maxh=80)
for yy,h,tag,b in [(151,'12:00 -15:00 · TURNO ALMUERZO','PICO 1','Servicio exprés, menús combos ejecutivos y rotación veloz.'),(260,'15:00 -19:00 · TURNO CAFÉ & LORE','VALLE','Mise en place de cocina, snacks, bebidas temáticas y juegos casuales.'),(369,'19:00 -22:00 · TURNO EXPERIENCIA SOCIAL','PICO MÁX','Retos en mesa, coctelería sin alcohol / cervecera y ticket alto.')]:
    panel(356,yy,564,98);label(h,374,yy+16,size=10.5);right(tag,902,yy+16,9,'Mono',GOLD);para(b,374,yy+45,527,13,WHITE,maxh=43)
end()

# 14 - Process
base(14)
process=[('1 min','RECIBIR','Asignación de mesa y QR digital.'),('2 min','COMANDAR','Transmisión al KDS de cocina.'),('6 min','PREPARAR','Ensamble en línea continua.'),('2 min','VERIFICAR','Control de calidad y plaqueo.'),('2 min','ENTREGAR','Servicio temático en mesa.')]
for j,(duration,h,b) in enumerate(process):
    xx=40+179*j;panel(xx,169,164,201,j==2);txt(duration,xx+17,188,31,'Display',RED);label(h,xx+17,246,WHITE,12);para(b,xx+17,287,130,12,maxh=64)
    if j<4:line(xx+165,268,xx+177,268,RED,1.4)
panel(40,402,880,66,True);txt('13 MINUTOS',58,417,33,'Display',RED)
txt('| Zona Crítica de Servicio Estandarizada',246,429,14,'Bold')
right('MEDIR · CORREGIR · ESCALAR',899,431,9,'Mono',MUTED)
end()

# 15 - Plan
base(15)
panel(40,152,439,321)
label('ACCESO PÚBLICO / FACHADA EXTERIOR',63,169,MUTED,9)
zones=[(58,195,151,103,'ZONA 1','RECEPCIÓN & CAJA','Check-in / Mostrador QR'),(220,195,241,103,'ZONA 3','SALA & EXPERIENCIA GAMER','Mesas temáticas / Pantallas lore'),(58,319,225,103,'ZONA 2','COCINA & ENSAMBLE','Línea cerrada / Pase verificado'),(294,319,167,103,'ZONA 4','ALMACÉN & APOYO','Cámaras / Stock seco')]
for xx,yy,ww,hh,no,h,b in zones:
    rect(xx,yy,ww,hh,'#222D30',LINE);label(no,xx+10,yy+10,size=9);para(h.replace('&','&amp;'),xx+10,yy+32,ww-20,13,WHITE,'Bold',maxh=39);para(b,xx+10,yy+76,ww-20,9.7,maxh=26)
line(79,307,442,307,RED,1.5);poly([(442,307),(435,303),(435,311)],RED)
label('ÁREA DE CLIENTES',304,282,GOLD,8)
label('ACCESO PROVEEDORES / CARGA POSTERIOR',63,443,MUTED,8.6)
for yy,h,b in [(164,'FLUJO UNIDIRECCIONAL','El comensal ingresa por recepción, pasa a sala y sale sin cruzarse con el servicio de entrega.'),(268,'RUTA LIMPIA DE ALIMENTOS','Cocina y pase despachan directamente a sala a través de un pasillo central despejado.'),(372,'ABASTECIMIENTO INDEPENDIENTE','Insumos y desechos entran y salen exclusivamente por la puerta técnica posterior.')]:
    rect(502,yy,3,84,RED);label(h,521,yy+3,WHITE,11);para(b,521,yy+32,391,12.5,maxh=60)
end()

# 16 - Organization
base(16)
panel(314,146,332,89,True);label('DIRECCIÓN GENERAL',353,167,size=12);txt('GERENCIA ESTRATÉGICA',351,197,20,'Display')
line(480,235,480,260,RED,1.5);line(182,260,778,260,RED,1.5)
org=[('OPERACIONES','Cocina + Servicio','Cumplimiento de los 13 minutos y estándar de mermas.'),('EXPERIENCIA','Narrativa + Comunidad','Retos en mesa, ambientación gamer y lealtad.'),('ADMINISTRACIÓN','Finanzas + Compras','Flujo de caja, compras a proveedores y costo unitario.')]
for j,(h,a,b) in enumerate(org):
    xx=40+298*j;line(xx+142,260,xx+142,287,RED,1.5);panel(xx,287,284,178)
    txt(h,xx+20,307,23,'Display');label(a,xx+20,348,RED,12);para(b,xx+20,390,244,13,WHITE,maxh=66)
end()

# 17 - Closing
forest(24,True)
label('PROYECTO FINAL INTEGRAL · EVALUACIÓN',40,30,size=10);right('SEDE 01 · 2025',920,30,10,'Mono',MUTED)
tally(807,133,1.3,'#85928E')
txt('La Niebla Llama.',40,111,62,'Display')
txt('El Banquete está Listo.',40,180,62,'Display',RED)
para('Todos los requerimientos de la Etapa 1 y Etapa 2 fundamentados técnica, financiera y operativamente.',43,273,731,17,WHITE,maxh=64)
for xx,n,t in [(40,'100%','RÚBRICA CUMPLIDA'),(339,'13′','ZONA CRÍTICA'),(636,'18-20 M','PAYBACK ESTIMADO')]:
    line(xx,358,xx+282,358,LINE);txt(n,xx,377,53,'Display');label(t,xx,444,MUTED,10)
line(40,481,920,481,RED);txt('PROYECTO FINAL APROBADO',40,502,12,'Bold')
right('17',920,497,19,'Display',RED)
end()

c.save()
# Automated checks complement the required visual QA.
bad=[x for x in checks if x[2]<0 or x[3]<0 or x[2]+x[4]>W+1 or x[3]+x[5]>H+1]
assert not bad,bad
(TMP/'layout_checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf-8')
print(OUT)
pdf=pdfium.PdfDocument(str(OUT))
for i,page in enumerate(pdf):
    page.render(scale=1.25).to_pil().convert('RGB').save(TMP/f'page-{i+1:02}.jpg',quality=92)
for batch in range(3):
    ids=list(range(batch*6,min((batch+1)*6,len(pdf))))
    sheet=Image.new('RGB',(1440,2*426),(230,230,230));d=ImageDraw.Draw(sheet)
    for k,i in enumerate(ids):
        im=Image.open(TMP/f'page-{i+1:02}.jpg');im.thumbnail((720,405));x=(k%2)*720;y=(k//2)*426
        # Three rows, with enough height for every page.
    sheet=Image.new('RGB',(1440,3*426),(230,230,230));d=ImageDraw.Draw(sheet)
    for k,i in enumerate(ids):
        im=Image.open(TMP/f'page-{i+1:02}.jpg');im.thumbnail((720,405));x=(k%2)*720;y=(k//2)*426
        sheet.paste(im,(x,y+21));d.text((x+10,y+3),f'{i+1:02}',fill='black')
    sheet.save(TMP/f'contact-{batch+1}.jpg',quality=92)
print('Rendered',len(pdf),'pages; bounds checks passed.')
