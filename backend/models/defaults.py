from app import db
from models.experience import Experience

titles = ["Concerto Rock", "Avventura di Escursionismo", "Cena nel Deserto", "Visita al Vecchio Castello"]
descriptions = ["Un'esperienza emozionante di concerto rock con alcune delle migliori band rock. Goditi performance elettrizzanti, spettacoli di luci mozzafiato e una notte indimenticabile di musica e intrattenimento.",
"Intraprendi un'avventura di escursionismo esaltante attraverso paesaggi mozzafiato. Perfetto per gli appassionati di attività all'aperto e gli amanti della natura. Vivi l'emozione di conquistare sentieri impegnativi e ammirare viste spettacolari.",
"Immergiti nella bellezza serena del deserto con una cena gourmet sotto le stelle. Goditi un delizioso pasto preparato da chef di alto livello, circondato dal paesaggio tranquillo e maestoso del deserto.",
"Fai un salto indietro nel tempo con una visita a un vecchio castello. Esplora antiche sale, scopri segreti nascosti e ammira l'architettura. Scopri la ricca storia e le leggende che circondano questa magnifica struttura."]
prices = [100, 150, 200, 250]
urls = ["https://picsum.photos/id/158/200/300", "https://picsum.photos/id/177/200/300", "https://picsum.photos/id/184/200/300", "https://picsum.photos/id/193/200/300"]

def init_defaults():
    if Experience.query.count() > 0:
        return
    for i in range(0,4):
        experience = Experience(title=titles[i], description=descriptions[i], price=prices[i], imageUrl=urls[i])
        db.session.add(experience)
    db.session.commit()