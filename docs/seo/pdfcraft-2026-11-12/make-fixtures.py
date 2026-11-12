"""Recreate the synthetic inputs used in the 2026-11-12 PdfCraft CLI checks.
Requires reportlab and pdftoppm. Output files contain no personal information.
Usage: python make-fixtures.py /path/to/output
"""
from pathlib import Path
import subprocess
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

out = Path(sys.argv[1])
out.mkdir(parents=True, exist_ok=True)

def page(name, title):
    c = canvas.Canvas(str(out / name), pagesize=(612, 792), invariant=1)
    c.setTitle(title)
    c.setAuthor('PDFCraftTool.org synthetic test fixture')
    c.setFillColor(HexColor('#173447'))
    c.rect(0, 706, 612, 86, fill=1, stroke=0)
    c.setFillColor(HexColor('#ffffff'))
    c.setFont('Helvetica-Bold', 23)
    c.drawString(42, 740, title)
    c.setFillColor(HexColor('#202830'))
    c.setFont('Helvetica', 11)
    c.drawString(42, 28, 'Synthetic sample - PDFCraftTool.org - 12 November 2026')
    return c

c = page('scan-source.pdf', 'SCAN TO TEXT TEST')
c.setFont('Helvetica', 16)
for i, line in enumerate([
    'Reference: SCAN-108B',
    'Invoice date: 12 November 2026',
    'Item: Paper folders',
    'Quantity: 12',
    'Unit price: 4.50 USD',
    'Total due: 54.00 USD',
    'Please retain this page for your records.',
]): c.drawString(42, 650 - i * 39, line)
c.save()
subprocess.run(['pdftoppm', '-r', '200', '-singlefile', '-png', str(out/'scan-source.pdf'), str(out/'scan-raster')], check=True)
c = canvas.Canvas(str(out/'scan-image-only.pdf'), pagesize=(612,792), invariant=1)
c.setTitle('Image-only OCR test fixture')
c.drawImage(str(out/'scan-raster.png'), 0, 0, width=612, height=792)
c.save()

c = page('form-blank.pdf', 'FORM AND SIGNATURE TEST')
c.drawString(42, 667, 'Fictional record. Do not use this form for real transactions.')
for label, y in [('Full name', 612), ('Reference', 532)]:
    c.setFont('Helvetica-Bold', 12); c.drawString(42, y, label)
    c.acroForm.textfield(name='full_name' if label=='Full name' else 'reference', x=42, y=y-42, width=380, height=28, borderStyle='solid', forceBorder=True, fontSize=12)
c.acroForm.checkbox(name='approved', x=42, y=430, size=18, buttonStyle='check', checked=False, forceBorder=True)
c.setFont('Helvetica', 12);c.drawString(70, 434, 'I have checked the sample details.')
c.setFont('Helvetica-Bold', 12);c.drawString(42, 350, 'Visible signature (test only)')
c.line(42, 290, 330, 290)
c.setFont('Helvetica', 11);c.drawString(42, 250, 'A visible name or mark is not a certificate-based digital signature.')
c.save()

c = page('layout-source.pdf', 'PROJECT STATUS BRIEF')
c.setFont('Helvetica-Bold', 14); c.drawString(42, 670, 'Overview')
c.setFont('Helvetica', 11)
left=['The left column describes the scope.', 'Keep this paragraph together.', 'Review document structure after export.']
right=['The right column records the decision.', 'Check the reading order carefully.', 'This is a synthetic layout sample.']
for i,(a,b) in enumerate(zip(left,right)):
    c.drawString(42, 640-i*19, a);c.drawString(322, 640-i*19,b)
c.setFont('Helvetica-Bold', 14);c.drawString(42, 530, 'Budget table')
rows=[('Item','Quantity','Amount'),('Planning','2','120.00'),('Review','3','180.00'),('TOTAL','5','300.00')]
for i,row in enumerate(rows):
    y=494-i*30
    if i==0:
        c.setFillColor(HexColor('#e3edf2'));c.rect(42,y-10,528,30,fill=1,stroke=0)
    c.setFillColor(HexColor('#202830'));c.setFont('Helvetica-Bold' if i in [0,3] else 'Helvetica',11)
    for x,txt in zip([54,314,450],row):c.drawString(x,y,txt)
for x in [42,300,436,570]:c.line(x,394,x,514)
for y in [394,424,454,484,514]:c.line(42,y,570,y)
c.setFont('Helvetica-Bold',14);c.drawString(42,350,'Progress chart (vector artwork)')
for i,(label,w,color) in enumerate([('Planning',260,'#24566e'),('Review',170,'#dc6944')]):
    y=312-i*42;c.setFillColor(HexColor(color));c.rect(132,y-8,w,20,fill=1,stroke=0)
    c.setFillColor(HexColor('#202830'));c.setFont('Helvetica',11);c.drawString(42,y,label)
c.setFont('Helvetica-Oblique',11);c.drawString(42,210,'Check column placement, table borders, colour and chart bars.')
c.save()
