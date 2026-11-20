// Visual descriptions of each artwork (what can be seen: figures, palette,
// composition, material), drafted from the photographs on 2026-11-20 and
// PENDING the owner's review. Only entries with `approved: true` are ever
// published (alt text, meta description, JSON-LD and, with the preview flag,
// a visible "Sobre la obra" paragraph). To approve one, change `approved` to
// `true`; to correct it, edit the text (keep `en` a faithful translation).
// Review list with thumbnails: docs/seo/revision-descripciones.md.

export interface ArtworkDescription {
  es: string;
  en: string;
  approved: boolean;
}

const d = (es: string, en: string, approved = false): ArtworkDescription => ({ es, en, approved });

export const artworkDescriptions: Record<string, ArtworkDescription> = {
  "obra-13": d(
    "Acrílico y óleo sobre lienzo en rojos y naranjas. A la izquierda y a la derecha hay niños de rasgos antiguos con gorros rojos; en el centro, un nido de cigüeñas sobre un tronco oscuro, con círculos amarillos detrás. Abajo a la izquierda se ven una pila de calaveras y dos figuras pequeñas con sombrero verde.",
    "Acrylic and oil on canvas in reds and oranges. On the left and right there are children with old-fashioned features wearing red caps; in the center, a stork nest on a dark trunk, with yellow circles behind it. At the lower left there are a pile of skulls and two small figures in green hats."
  ),
  "obra-132": d(
    "Vista del lienzo de gran formato apoyado en una pared, con un hombre de camisa blanca y pantalón negro de pie delante. La pintura, de acrílico y óleo sobre lienzo, muestra tres niños, un nido de cigüeñas sobre un tronco oscuro, ramas secas, calaveras y fondos rojos y naranjas con círculos amarillos.",
    "View of the large-format canvas leaning against a wall, with a man in a white shirt and black trousers standing in front. The painting, in acrylic and oil on canvas, shows three children, a stork nest on a dark trunk, bare branches, skulls and red and orange backgrounds with yellow circles."
  ),
  "obra-14": d(
    "Díptico de acrílico y óleo sobre lienzo, fotografiado con un hombre de pie delante. A la izquierda, una niña de vestido rojo con otros niños detrás, un colibrí y una liebre; a la derecha, un joven vestido de verde junto a una flor blanca y otro colibrí. Dominan los rojos, naranjas y círculos amarillos.",
    "Acrylic and oil on canvas diptych, photographed with a man standing in front. On the left, a girl in a red dress with other children behind her, a hummingbird and a hare; on the right, a young man dressed in green beside a white flower and another hummingbird. Reds, oranges and yellow circles dominate."
  ),
  "obra-15": d(
    "Acrílico y óleo sobre tela. Una niña pelirroja con vestido rojo y faja verde está de pie en el centro, con otros dos niños y una liebre detrás. Un colibrí grande se hunde en un charco negro con ondas verdes y otra ave se posa a la derecha. Hay círculos naranjas y amarillos y un marco gris.",
    "Acrylic and oil on canvas. A red-haired girl in a red dress with a green sash stands in the center, with two other children and a hare behind her. A large hummingbird dips into a black pool with green ripples and another bird perches on the right. There are orange and yellow circles and a gray border."
  ),
  "obra-16": d(
    "Óleo sobre tela. Un joven con ropa de rayas verdes y rojas, de espaldas y con la cabeza vuelta, sostiene una esfera azul de la que cae un hilo de gotas hacia un colibrí hundido en un estanque negro. Hay otros colibríes, una flor blanca, rocas naranjas y círculos rojos y amarillos arriba.",
    "Oil on canvas. A young man in green and red striped clothing, seen from behind with his head turned, holds a blue sphere from which a thread of drops falls toward a hummingbird sunk in a black pond. There are other hummingbirds, a white flower, orange rocks and red and yellow circles above."
  ),
  "obra-17": d(
    "Acrílico y óleo sobre tela sobre fondo blanco con un gran círculo. Un jarrón alto con girasol, flores azules y rojas ocupa el centro, junto a un florero pequeño sobre una mesa roja. A la izquierda hay dos garzas sobre una rama; a la derecha, una figura con sombrero de cono rojo. Texto al pie.",
    "Acrylic and oil on canvas on a white background with a large circle. A tall vase with a sunflower and blue and red flowers fills the center, beside a small vase on a red table. On the left there are two herons on a branch; on the right, a figure in a red cone hat. Text along the bottom edge."
  ),
  "obra-18": d(
    "Óleo y acrílico sobre tela con fondo blanco y círculos de colores traslúcidos. En el centro, un ramo alto de girasol y flores azules y un florero pequeño con flores amarillas y rosas sobre una mesa roja. A la derecha, dos figuritas de novios sostienen un pastel, y dos colibríes se posan en ramas arriba.",
    "Oil and acrylic on canvas with a white background and translucent colored circles. In the center, a tall bouquet with a sunflower and blue flowers and a small vase of yellow and pink flowers on a red table. On the right, two bride-and-groom figurines hold a cake, and two hummingbirds perch on branches above."
  ),
  "obra-19": d(
    "Una niña de gorro verde y vestido rojo mira hacia una esfera luminosa amarilla que estalla en el centro, sobre un estanque oscuro. A la derecha hay una figura pelirroja con alas y otro niño inclinado. Hay un ave, plantas, estrellas negras y un marco rojo.",
    "A girl in a green hat and red dress looks toward a glowing yellow sphere that bursts open in the center, above a dark pond. On the right there are a red-haired figure with wings and another child bending over. There are a bird, plants, black stars and a red border."
  ),
  "obra-20": d(
    "Acrílico y óleo sobre lienzo en verdes oliva y amarillo ácido. A la izquierda, un paisaje con palmas de tronco rojo y blanco, manchas negras y una cigüeña blanca que picotea en primer plano. A la derecha, en una franja vertical, una figura alargada de ojos redondos, nariz verde y adornos rojos.",
    "Acrylic and oil on canvas in olive greens and acid yellow. On the left, a landscape with palms with red and white trunks, black patches and a white stork pecking in the foreground. On the right, in a vertical strip, an elongated figure with round eyes, a green nose and red ornaments."
  ),
  "obra-21": d(
    "Óleo y acrílico sobre fondo azul oscuro con un recuadro negro y borde verde. A la izquierda, un hueso blanco muy alto del que salen hojas y flores rosadas. Un colibrí se posa entre ramas, hay una nube de puntos de colores arriba, una luna violeta y cuatro figuras pequeñas sobre círculos naranjas.",
    "Oil and acrylic on a dark blue ground with a black panel and green border. On the left, a very tall white bone with leaves and pink flowers growing from it. A hummingbird perches among branches, there is a cloud of colored dots above, a violet moon and four small figures on orange circles."
  ),
  "obra-22": d(
    "Acrílico y óleo sobre fondo violeta. Arriba, una figura simétrica de formas negras, rosadas y blancas con un ojo y una boca abiertos; debajo, un pez sobre un semicírculo negro y una calavera en un círculo. A los lados hay semicírculos rojos, una planta de bulbos con patas y hilos verticales finos.",
    "Acrylic and oil on a violet ground. At the top, a symmetrical figure of black, pink and white shapes with an eye and an open mouth; below it, a fish on a black semicircle and a skull in a circle. At the sides there are red semicircles, a bulb-shaped plant with legs and thin vertical threads."
  ),
  "obra-23": d(
    "Pintura de acrílico y óleo sobre lienzo, fotografiada sobre un caballete en el taller. Un retrato sonriente de una niña, en tonos verde turquesa, ocupa un círculo a la izquierda. A la derecha, un jarrón con flores azules y rojas sobre una mesa, con sombras de plantas en rojo oscuro y marco naranja.",
    "Acrylic and oil painting on canvas, photographed on an easel in the studio. A smiling portrait of a girl, in turquoise green tones, fills a circle on the left. On the right, a vase with blue and red flowers on a table, with dark red plant shadows and an orange border."
  ),
  "obra-24": d(
    "Acrílico y óleo sobre tela, de formato horizontal, con fondo naranja. A la izquierda, una niña con sombrero azul y un niño de pantalón de rayas caminan sobre un círculo rojo. A la derecha, otra niña de capa azul está dentro de un círculo azul, rodeada de colibríes. Hay plantas rojas en los bordes.",
    "Acrylic and oil on canvas, horizontal format, with an orange background. On the left, a girl in a blue hat and a boy in striped trousers walk across a red circle. On the right, another girl in a blue cloak sits inside a blue circle, surrounded by hummingbirds. There are red plants at the edges."
  ),
  "obra-25": d(
    "Acrílico, óleo y piedra sobre lienzo. Sobre un fondo crema se ven siluetas verdes pálidas de jarrones y plantas, y piedras pequeñas pegadas a la superficie que proyectan sombra. A la derecha, una franja rojiza con copas azules, y abajo una mesa beige con dos vasos, una rosa y un bambú.",
    "Acrylic, oil and stone on canvas. On a cream background there are pale green silhouettes of vases and plants, and small stones attached to the surface that cast shadows. On the right, a reddish strip with blue glasses, and below a beige table with two glasses, a rose and a bamboo plant."
  ),
  "obra-26": d(
    "Acrílico y óleo. Dos niños de ropa rosada y blanca se agachan sobre una pequeña planta de flor morada; ella sostiene un cuchillo. Detrás hay un cielo rojo y naranja degradado y una línea que baja con una gota azul. A la derecha, una franja verde con una figura alargada de patas y botas.",
    "Acrylic and oil. Two children in pink and white clothes crouch over a small plant with a purple flower; the girl holds a knife. Behind them is a graded red and orange sky and a line descending with a blue drop. On the right, a green strip with an elongated figure with legs and boots."
  ),
  "obra-27": d(
    "Una figura de pie con cabeza negra, pico largo y oscuro y un ojo rojo, vestida con una prenda blanca con lunares amarillos y negros, sobre patas delgadas con membranas. El fondo verde de pincelada visible lleva una forma vegetal verde claro a la derecha y una franja burdeos en la base. Técnica: acrílico y óleo.",
    "A standing figure with a black head, a long dark beak and a red eye, dressed in a white garment with yellow and black dots, on thin webbed legs. The green background, with visible brushstrokes, has a light green plant shape on the right and a burgundy band at the base. Technique: acrylic and oil."
  ),
  "obra-28": d(
    "Una mesa de billar vista desde arriba, con un paño gris claro enmarcado por bordes rojos y rodeado de un fondo rosa rojizo, con círculos rojos en las esquinas. Sobre el paño hay bolas de colores y, en el centro, un grupo de pequeños dibujos y figuras finas. Técnica: acrílico y óleo.",
    "A pool table seen from above, with a light grey cloth framed by red edges and surrounded by a reddish-pink background, with red circles in the corners. On the cloth are colored balls and, in the center, a group of small drawings and fine figures. Technique: acrylic and oil."
  ),
  "obra-29": d(
    "Sobre una tela de flores sobre fondo crema hay una figura verde de cabeza redonda con dos palos cruzados en el rostro, rodeada de rectángulos de madera en rosa, lila, naranja y beige. Un círculo blanco grande, círculos verdes y morados y un marco azul sobre fondo verdoso completan la composición. Técnica: acrílico, óleo y madera sobre lienzo.",
    "On a floral fabric with a cream background there is a green figure with a round head and two crossed sticks on its face, surrounded by wooden rectangles in pink, lilac, orange and beige. A large white circle, green and purple circles and a blue frame on a greenish background complete the composition. Technique: acrylic, oil and wood on canvas."
  ),
  "obra-30": d(
    "Un marco rojo de bordes angulosos y esquinas negras rodea un fondo claro con rayas horizontales finas, como un pentagrama. Dentro hay una hoja blanca, una figura con sombrero negro y cabeza rosada y una cabeza que sostiene un tallo; a la derecha, un personaje con gorro azul puntiagudo. Técnica: acrílico y óleo.",
    "A red frame with angular edges and black corners surrounds a light background with fine horizontal stripes, like a musical staff. Inside are a white sheet, a figure with a black hat and pink head, and a head holding a stem; on the right, a character with a pointed blue cap. Technique: acrylic and oil."
  ),
  "obra-31": d(
    "Un niño con pijama de rayas reza arrodillado junto a una cama con colcha rosa, en un cuarto oscuro con ventana y luna. El suelo es una franja horizontal de rojo, azul, verde y amarillo. Cuatro hilos negros cuelgan del techo con gotas de luz amarilla en el extremo, junto a una manzana verde y una mancha gris flotante. Técnica: acrílico y óleo.",
    "A boy in striped pajamas kneels in prayer beside a bed with a pink bedspread, in a dark room with a window and a moon. The floor is a horizontal band of red, blue, green and yellow. Four black threads hang from the ceiling with drops of yellow light at the end, next to a green apple and a floating grey patch. Technique: acrylic and oil."
  ),
  "obra-32": d(
    "A la izquierda, sobre una banda azul, una mujer de vestido azul y peinado alto rosa sostiene bolas negras. A la derecha, sobre un fondo de lino con florecillas azules, hay una mesa de billar naranja con dos candeleros y una pieza pequeña, y las letras blancas «JAM S». Una gran diagonal negra cruza la tela. Técnica: acrílico y óleo.",
    "On the left, over a blue band, a woman in a blue dress and tall pink hair holds black balls. On the right, over a linen background with small blue flowers, there is an orange pool table with two candlesticks and a small object, and the white letters “JAM S”. A large black diagonal crosses the canvas. Technique: acrylic and oil."
  ),
  "obra-33": d(
    "Sobre un fondo amarillo pálido enmarcado por tela de flores, un hombre de abrigo negro con sombrero y un niño de gorro rojo con un bastón están de pie a la izquierda. Arriba cuelgan dos colibríes de colores y ramas con flores. Abajo a la derecha, una niña sentada sostiene una muñeca; una mancha rosa cae al centro. Técnica: acrílico y óleo sobre tela.",
    "On a pale yellow background framed by floral fabric, a man in a black coat and hat and a boy in a red cap with a cane stand on the left. Above, two colorful hummingbirds and flowering branches hang. At lower right, a seated girl holds a doll; a pink stain falls at the center. Technique: acrylic and oil on canvas."
  ),
  "obra-34": d(
    "Un niño con adorno en la cabeza, vestido con túnica de colores y una bandeja de frutas, va sentado sobre un elefante gris que lleva una mujer inclinada y otro niño detrás. El fondo es color durazno con borde morado y tela de flores en el marco. A la izquierda hay una mancha turquesa y círculos con estampado floral. Técnica: acrílico y óleo sobre lienzo.",
    "A boy with a head ornament, dressed in a colorful tunic and holding a tray of fruit, sits on a grey elephant that carries a bending woman and another child behind. The background is peach-colored with a purple border and floral fabric on the frame. On the left there is a turquoise splash and circles with floral patterns. Technique: acrylic and oil on canvas."
  ),
  "obra-35": d(
    "En el centro, un jarrón alto con girasol, flores azules, rojas y amarillas sobre una mesa redonda oscura, dentro de un gran círculo blanco. Tres colibríes azules y naranjas vuelan arriba a la derecha, y un niño con suéter azul extiende las manos junto a una silla. El fondo es blanco y lila. Técnica: acrílico y óleo.",
    "At the center, a tall vase with a sunflower and blue, red and yellow flowers stands on a dark round table, inside a large white circle. Three blue and orange hummingbirds fly at upper right, and a boy in a blue sweater holds out his hands beside a chair. The background is white and lilac. Technique: acrylic and oil."
  ),
  "obra-36": d(
    "Un lienzo muy vertical y estrecho sobre fondo amarillo pálido con ramas grises. Una pila de criaturas de rostros grotescos, rojas y verdes, está apilada bajo un círculo naranja; abajo, una mujer de vestido rojo y pelo oscuro camina entre hierba alta. Hay dos círculos azul grisáceo con estampado. Técnica: acrílico y óleo sobre tela.",
    "A very tall, narrow canvas on a pale yellow background with grey branches. A stack of red and green creatures with grotesque faces is piled up beneath an orange circle; below, a woman in a red dress with dark hair walks among tall grass. There are two grey-blue circles with patterns. Technique: acrylic and oil on canvas."
  ),
  "obra-37": d(
    "Sobre un fondo azul intenso, un cuadro enmarcado en negro muestra una mesa con mantel azul: a la izquierda un hombre calvo con bastón, al centro un objeto naranja en forma de carpa con cara y a la derecha una figura morada sentada. Bajo la mesa hay un árbol, un osito azul y dos niñas, entre círculos de colores. Técnica: acrílico y óleo sobre tela.",
    "On an intense blue background, a black-framed picture shows a table with a blue cloth: on the left a bald man with a cane, at the center an orange tent-shaped object with a face, and on the right a seated purple figure. Beneath the table are a tree, a blue teddy bear and two girls, among colored circles. Technique: acrylic and oil on canvas."
  ),
  "obra-38": d(
    "Obra circular sobre fondo verde agua con borde verde oscuro y texto escrito alrededor. Un niño con gorro blanco de piel y una niña con pañuelo rojo y falda estampada flanquean un jarrón de cristal con flores, sobre una mesa redonda marrón con dos esferas. Detrás, una rosa roja y un sol amarillo. Técnica: acrílico y óleo sobre lienzo.",
    "Circular work on an aqua green background with a dark green border and text written around it. A child in a white fur cap and a girl with a red headscarf and patterned skirt flank a glass vase with flowers, on a round brown table with two spheres. Behind, a red rose and a yellow sun. Technique: acrylic and oil on canvas."
  ),
  "obra-39": d(
    "Obra circular de fondo rojo con una niña de vestido rojo, sombrero blanco con flores azules y paraguas cerrado. A la izquierda, un ramo de flores reales sobresale de un jarrón de vidrio, junto a un pájaro azul, hojas oscuras y círculos naranjas. Abajo, una figura pequeña camina sobre un suelo oscuro con puntos de luz; texto en el borde marrón. Técnica: acrílico, óleo y flores sobre lienzo sobre madera.",
    "Circular work with a red background showing a girl in a red dress, a white hat with blue flowers and a closed umbrella. On the left, a bouquet of real flowers rises from a glass vase, beside a blue bird, dark leaves and orange circles. Below, a small figure walks on dark ground with points of light; text on the brown border. Technique: acrylic, oil and flowers on canvas on wood."
  ),
  "obra-40": d(
    "Obra circular con borde azul y texto alrededor. Dos niños de espaldas, con sombrero verde y gorro rojo y vestido rojo con puntos claros, se sientan en un bosque de líneas finas en gris azulado. A la derecha, un conejo gris está de pie entre flores rosadas. Técnica: acrílico, marcador y óleo sobre lienzo.",
    "Circular work with a blue border and text around it. Two children seen from behind, one with a green hat and the other with a red bonnet and a red dress with light dots, sit in a forest drawn in fine blue-grey lines. On the right, a grey rabbit stands among pink flowers. Technique: acrylic, marker and oil on canvas."
  ),
  "obra-41": d(
    "Obra circular de fondo naranja con dos niñas de la mano, una con vestido verde de lunares y gorro rojo, otra con vestido rojo y sombrero verde. Detrás hay un círculo claro con un paisaje gris y siluetas negras de aves y hojas; hojas verdes a ambos lados y texto en la base. Técnica: acrílico y óleo sobre lienzo, sobre madera.",
    "Circular work with an orange background and two girls holding hands, one in a green polka-dot dress and red bonnet, the other in a red dress and green hat. Behind them is a light circle with a grey landscape and black silhouettes of birds and leaves; green leaves on both sides and text at the base. Technique: acrylic and oil on canvas, on wood."
  ),
  "obra-42": d(
    "Pintura de formato circular sobre fondo negro, con un cielo azul en la parte superior y un disco rojo con una pequeña flor en relieve. En un patio con muro rojo aparecen un hombre sentado con gorro rojo, dos mujeres con abanicos, un niño agachado y árboles en flor. Técnica: acrílico, óleo, rosa y pájaro de bronce sobre lienzo, montada en madera.",
    "Circular painting on a black ground, with a blue sky at the top and a red disc holding a small raised flower. In a courtyard with a red wall appear a seated man in a red cap, two women with fans, a crouching child and flowering trees. Technique: acrylic, oil, bronze rose and bird on canvas, mounted on wood."
  ),
  "obra-43": d(
    "Escena sobre fondo naranja intenso y una franja verde superior. A la izquierda, un nido de cigüeñas con tres aves sobre un poste, con un disco oscuro de anillos verdes. A la derecha, un joven de espaldas con jubón a rayas sostiene a una figura dormida. Círculos de colores flotan arriba. Técnica: acrílico y óleo sobre lienzo.",
    "Scene on an intense orange ground with a green band above. On the left, a stork nest with three birds sits on a pole, with a dark disc of green rings. On the right, a young man seen from behind in a striped doublet holds a sleeping figure. Coloured circles float above. Technique: acrylic and oil on canvas."
  ),
  "obra-44": d(
    "Cuadro con marco negro decorado y un fondo rosa salmón con papel floral. Al centro, un florero de vidrio sobre una mesa redonda con girasol, flores azules y rojas. Un candelabro morado cuelga arriba, una mujer de perfil aparece a la izquierda y grandes círculos blancos se superponen con siluetas de plantas. Técnica: acrílico y óleo sobre lienzo.",
    "Painting with a decorated black frame and a salmon-pink ground with floral wallpaper. At the centre, a glass vase on a round table holds a sunflower and blue and red flowers. A purple chandelier hangs above, a woman in profile appears on the left, and large white circles overlap with plant silhouettes. Technique: acrylic and oil on canvas."
  ),
  "obra-45": d(
    "Un ramo en jarrón y una mesa redonda ocupan el centro, rodeados de colibríes de pecho rojo y verde. A la izquierda, una mujer de perfil sostiene un cuenco, y un sombrero negro con cuentas verdes descansa abajo. El fondo es de papel floral en tonos pastel, con un marco negro grabado. Técnica: óleo sobre lienzo.",
    "A bouquet in a vase and a round table fill the centre, surrounded by red and green hummingbirds. On the left, a woman in profile holds a bowl, and a black hat with green beads rests below. The background is pastel floral paper, with an engraved black frame. Technique: oil on canvas."
  ),
  "obra-46": d(
    "Cuatro loros de plumaje verde, amarillo y naranja se posan en una rama a la izquierda. A la derecha, un ramo con rosas rojas y un lirio rosado sale de un jarrón de vidrio. Detrás hay un gran círculo blanco con borde morado y dos estrellas negras de varias puntas. El fondo rosa lleva flores y bayas. Técnica: acrílico y óleo sobre lienzo.",
    "Four parrots with green, yellow and orange plumage perch on a branch on the left. On the right, a bouquet with red roses and a pink lily rises from a glass vase. Behind them is a large white circle with a purple border and two black multi-pointed stars. The pink background carries flowers and berries. Technique: acrylic and oil on canvas."
  ),
  "obra-47": d(
    "En un gran círculo blanco con borde dorado, un colibrí de pecho naranja y dorso verde se posa en una rama junto a rosas y lisianthus morados. Abajo a la izquierda, un martín pescador azul y naranja está sobre ramas con flores rosadas. Dos estrellas negras asoman en las esquinas, sobre papel floral verde pálido. Técnica: acrílico y óleo sobre lienzo.",
    "Within a large white circle with a gold border, a hummingbird with an orange chest and green back perches on a branch beside roses and purple lisianthus. Lower left, a blue and orange kingfisher sits on branches with pink flowers. Two black stars appear in the corners, over pale green floral paper. Technique: acrylic and oil on canvas."
  ),
  "obra-48": d(
    "Una gran estrella negra de cinco puntas cruza el lienzo y lo divide en sectores sobre fondo crema. Hay muchos círculos de distintos tamaños: negros, marrones y naranjas a la izquierda, azules a la derecha. Tres hojas blancas se alinean sobre un círculo azul, y salpicaduras de pintura cubren la superficie. Técnica: acrílico y óleo sobre lienzo.",
    "A large black five-pointed star crosses the canvas and divides it into sections on a cream ground. There are many circles of different sizes: black, brown and orange on the left, blue on the right. Three white leaves line up over a blue circle, and paint splatters cover the surface. Technique: acrylic and oil on canvas."
  ),
  "obra-49": d(
    "Superficie crema cubierta de salpicaduras, puntos y manchas de colores, con círculos grandes negros, rojos y naranjas. Una columna oscura vertical atraviesa la imagen por la izquierda y una pequeña estrella blanca aparece arriba a la derecha. Una sombra gris ocupa el lado derecho y un borde negro rodea la obra. Técnica: acrílico y óleo sobre lienzo.",
    "Cream surface covered with splatters, dots and coloured stains, with large black, red and orange circles. A dark vertical column crosses the image on the left and a small white star appears at upper right. A grey shadow fills the right side and a black border surrounds the work. Technique: acrylic and oil on canvas."
  ),
  "obra-50": d(
    "Sobre fondo crema se ven numerosas huellas de pies, negras y grises, dispuestas dentro y fuera de un gran círculo de puntos. Hay puntos de colores y manchas dispersas. A la derecha, una banda vertical negra lleva texto escrito en blanco. Bordes finos naranja y verde enmarcan los lados. Técnica: acrílico y óleo sobre lienzo.",
    "On a cream ground there are many black and grey footprints, arranged inside and outside a large circle of dots. Coloured dots and scattered stains appear throughout. On the right, a vertical black band carries text written in white. Thin orange and green edges frame the sides. Technique: acrylic and oil on canvas."
  ),
  "obra-51": d(
    "Fondo de pequeñas esferas amarillas apiladas, pintadas con sombras que les dan volumen. Sobre él se disponen cinco estrellas de varias puntas en tonos de verde oscuro y verde claro, de distintos tamaños. Algunas esferas amarillas más grandes parecen posadas sobre las puntas de las estrellas. Técnica: acrílico sobre lienzo.",
    "A background of small stacked yellow spheres, painted with shadows that give them volume. Over it sit five multi-pointed stars in dark and light green, of different sizes. Some larger yellow spheres seem to rest on the star points. Technique: acrylic on canvas."
  ),
  "obra-52": d(
    "Fondo negro tipo pizarra con fórmulas y diagramas dibujados en blanco, entre ellos círculos, ejes y ecuaciones. En el centro se ve un fémur pintado con realismo, con un pequeño pájaro de plumas verdes y amarillas posado en su extremo superior. Detrás se adivina una estrella oscura. Firmado y fechado abajo a la derecha. Técnica: acrílico y óleo sobre lienzo.",
    "Black chalkboard-like ground with formulas and diagrams drawn in white, including circles, axes and equations. At the centre is a realistically painted femur, with a small bird with green and yellow feathers perched on its upper end. A dark star can be made out behind. Signed and dated at lower right. Technique: acrylic and oil on canvas."
  ),
  "obra-53": d(
    "Sobre un fondo amarillo intenso, cuatro aves adultas de pecho amarillo y antifaz azul y negro se juntan en una rama. Debajo, cuatro polluelos se posan en otra rama más fina. A la derecha sale una estrella negra con facetas verdes. Abajo hay una franja verde y pequeños detalles. Técnica: acrílico sobre lienzo.",
    "On an intense yellow ground, four adult birds with yellow chests and blue and black eye masks huddle on a branch. Below, four chicks perch on a thinner branch. On the right a black star with green facets extends into the scene. A green band and small details appear at the bottom. Technique: acrylic on canvas."
  ),
  "obra-54": d(
    "Fondo de esferas rojas y naranjas apiladas, con varias estrellas negras de puntas largas y una estrella roja y naranja en el centro. Hay discos oscuros con círculos concéntricos y líneas blancas, cráneos pequeños agrupados a la derecha y huellas de pies claras abajo a la izquierda. Técnica: acrílico sobre lienzo.",
    "Background of stacked red and orange spheres, with several black long-pointed stars and a red and orange star at the centre. There are dark discs with concentric circles and white lines, small skulls grouped on the right, and pale footprints at lower left. Technique: acrylic on canvas."
  ),
  "obra-55": d(
    "Seis óvalos negros de tamaño creciente, de izquierda a derecha, se alinean sobre fondo blanco. El primero es pequeño y punteado; en los siguientes aparece una figura humana desnuda acompañada de más aves de colores, como un loro rojo y un faisán dorado. El último óvalo incluye un cubo dibujado en líneas blancas. Técnica: acrílico y óleo sobre lienzo.",
    "Six black ovals of increasing size, from left to right, are lined up on a white background. The first is small and dotted; in the following ones a nude human figure appears with more colourful birds, such as a red parrot and a golden pheasant. The last oval includes a cube drawn in white lines. Technique: acrylic and oil on canvas."
  ),
  "obra-56": d(
    "Óvalo vertical de fondo negro con una figura humana desnuda y caminando, de piel anaranjada, dentro de un cubo dibujado con líneas blancas. Alrededor hay un guacamayo rojo con las alas abiertas, otros dos guacamayos, un jilguero amarillo y flores blancas. Un texto manuscrito blanco ocupa el centro. Está hecho en acrílico y óleo sobre lienzo.",
    "Vertical oval with a black background showing a naked, walking human figure with orange skin inside a cube drawn in white lines. Around it are a red macaw with open wings, two more macaws, a yellow goldfinch and white flowers. A handwritten white text sits in the center. It is made in acrylic and oil on canvas."
  ),
  "obra-57": d(
    "Óvalo vertical oscuro con una figura humana desnuda y de piel anaranjada, con cabeza de ave de pecho amarillo y alas de insecto traslúcidas. Junto a ella hay un pájaro de cabeza roja y plumaje de colores, y un faisán dorado rojo y amarillo en la parte baja. Puntos blancos forman una trama sobre el fondo. Acrílico y óleo sobre lienzo.",
    "Dark vertical oval with a naked, orange-skinned human figure that has the head of a yellow-breasted bird and translucent insect wings. Beside it is a red-headed bird with colorful plumage, and a red and yellow golden pheasant at the bottom. White dots form a grid over the background. Acrylic and oil on canvas."
  ),
  "obra-58": d(
    "Óvalo vertical negro, fotografiado sobre una pared blanca. Dentro, una figura humana desnuda y alargada con un ala azul transparente en la espalda. La rodean un ave de cabeza roja y azul arriba, un pájaro de pecho blanco y rosa a la derecha y un faisán rojo y amarillo abajo. Arriba a la derecha hay una zona de puntos. Técnica: acrílico y óleo sobre lienzo.",
    "Vertical black oval, photographed against a white wall. Inside, an elongated nude human figure with a transparent blue wing on its back. It is surrounded by a bird with a red and blue head above, a white and pink chested bird on the right, and a red and yellow pheasant below. At upper right there is an area of dots. Technique: acrylic and oil on canvas."
  ),
  "obra-59": d(
    "Óvalo vertical negro con una cuadrícula de puntos blancos. Una figura humana desnuda, de piel dorada, aparece de espaldas junto a un ave de cabeza azul oscura y pico largo y curvo, y delante un faisán dorado de cresta amarilla y plumas rayadas. Acrílico y óleo sobre lienzo.",
    "Black vertical oval with a grid of white dots. A naked human figure with golden skin appears from behind next to a dark blue-headed bird with a long, curved beak, and in front is a golden pheasant with a yellow crest and striped feathers. Acrylic and oil on canvas."
  ),
  "obra-60": d(
    "Dos óvalos negros cubiertos de puntos blancos, colgados en la pared. El de la derecha muestra una figura humana desnuda y caminando, con aves de plumaje azul y verde detrás y a sus pies. El de la izquierda, más pequeño, solo tiene el contorno tenue de una figura. Acrílico y óleo sobre lienzo.",
    "Two black ovals covered in white dots, hung on a wall. The one on the right shows a naked, walking human figure with blue and green birds behind it and at its feet. The smaller one on the left has only the faint outline of a figure. Acrylic and oil on canvas."
  ),
  "obra-61": d(
    "Sobre un fondo marrón rojizo hay una estrella negra de cuatro puntas y, en la esquina superior izquierda, un rostro de niño en tonos oscuros. Abajo aparecen dos girasoles, y sobre el inferior una pequeña figura con vestido azul y amarillo. En la esquina inferior derecha se lee la firma y el año. Acrílico y óleo sobre lienzo.",
    "On a reddish-brown background there is a black four-pointed star and, in the upper left corner, a child's face in dark tones. Below are two sunflowers, and on the lower one sits a small figure in a blue and yellow dress. The signature and year are readable in the lower right corner. Acrylic and oil on canvas."
  ),
  "obra-62": d(
    "Composición horizontal con fondo morado y un rectángulo gris. En el centro, un círculo naranja con una estrella negra, y sobre él un faisán dorado y un pájaro de cabeza roja. A los lados hay un círculo verde, un ave azul, un niño de cabeza pálida y rostros pintados. Acrílico y óleo sobre lienzo.",
    "Horizontal composition with a purple background and a gray rectangle. In the center, an orange circle with a black star, and on it a golden pheasant and a red-headed bird. At the sides are a green circle, a blue bird, a pale-headed child and painted faces. Acrylic and oil on canvas."
  ),
  "obra-63": d(
    "Fondo rojo con tres figuras al estilo clásico: dos mujeres con túnicas, en tonos rojizos, y un joven vestido de blanco que sostiene una espada. A la derecha, un círculo claro con un ave grande de cabeza rosada y cuerpo azul. Flores de colores y un marco negro estampado rodean la escena. Acrílico y óleo sobre lienzo.",
    "Red background with three figures in a classical style: two women in tunics, in reddish tones, and a young man dressed in white holding a sword. On the right, a pale circle holds a large bird with a pink head and blue body. Colorful flowers and a patterned black frame surround the scene. Acrylic and oil on canvas."
  ),
  "obra-64": d(
    "Lienzo circular de fondo celeste, montado sobre madera negra tallada con motivos de flores. Dos aves grandes, una de cresta naranja y otra negra de pico amarillo, flanquean una estrella negra. Entre flores rosadas se ven pequeños niños, algunos con alas. Acrílico y óleo sobre lienzo circular montado en madera tallada.",
    "Circular canvas with a light blue background, mounted on black carved wood with floral motifs. Two large birds, one with an orange crest and one black with a yellow beak, flank a black star. Among pink flowers are small children, some with wings. Acrylic and oil on circular canvas mounted on carved wood."
  ),
  "obra-65": d(
    "Lienzo circular de fondo gris con decenas de pequeños esqueletos vestidos y bailando. En el centro, dos calaveras grandes de las que salen tallos con flores amarillas, sobre una mancha negra con estrellas. El marco es de madera negra tallada. Acrílico y óleo sobre lienzo montado en madera tallada.",
    "Circular canvas with a gray background and dozens of small skeletons, dressed and dancing. In the center, two large skulls from which stems with yellow flowers rise, over a black patch with stars. The frame is carved black wood. Acrylic and oil on canvas mounted on carved wood."
  ),
  "obra-66": d(
    "Vista lateral de un lienzo circular colgado en la pared. Se ven dos calaveras grandes y varios esqueletos pequeños con ropa de colores sobre fondo gris. El borde del soporte y la madera negra tallada que lo rodea aparecen en perspectiva. Acrílico y óleo sobre lienzo montado en madera tallada.",
    "Side view of a circular canvas hanging on a wall. Two large skulls and several small skeletons in colorful clothes are visible on a gray background. The edge of the support and the carved black wood around it appear in perspective. Acrylic and oil on canvas mounted on carved wood."
  ),
  "obra-67": d(
    "Lienzo circular de fondo rosa salmón sobre madera negra tallada. Un ave grande de cresta naranja y pico largo se posa en una rama con tulipanes blancos y rosados. A la derecha, una niña de vestido rosa se toca la cabeza junto a un niño pelirrojo de pico largo; detrás, una estrella negra. Acrílico y óleo sobre lienzo.",
    "Circular canvas with a salmon pink background on carved black wood. A large bird with an orange crest and long beak perches on a branch with white and pink tulips. On the right, a girl in a pink dress touches her head, beside a red-haired boy with a long beak; behind them, a black star. Acrylic and oil on canvas."
  ),
  "obra-68": d(
    "Toma en ángulo de un lienzo circular de fondo naranja, con una niña de blusa clara que se lleva la mano a la cabeza y un niño pelirrojo de perfil con nariz larga. A la izquierda asoma un ave de cresta roja y detrás una estrella negra. La madera negra tallada rodea el lienzo. Acrílico y óleo sobre lienzo.",
    "Angled shot of a circular canvas with an orange background, showing a girl in a light blouse raising her hand to her head and a red-haired boy in profile with a long nose. On the left appears a bird with a red crest, and behind is a black star. Carved black wood surrounds the canvas. Acrylic and oil on canvas."
  ),
  "obra-69": d(
    "Sobre un fondo verde claro, una niña de vestido azul con lazo y bolsillo blanco sostiene un paraguas cerrado. Cerca hay una garza, una cabeza de niña con trenzas, un corazón anatómico sobre un muñeco naranja y un grupo de personajes pequeños con sombreros. Un marco marrón rodea la imagen.",
    "On a light green background, a girl in a blue dress with a bow and a white pocket holds a closed umbrella. Nearby are a heron, a girl's head with braids, an anatomical heart on an orange doll, and a group of small figures in hats. A brown frame surrounds the image."
  ),
  "obra-70": d(
    "Composición cuadrada de colores intensos: círculos naranjas, morados y rojos sobre un fondo de papel floral. Una niña de falda amarilla y sombrero oscuro sostiene una jarra, un mono rojo con un aro verde está agachado, y un niño de camisa verde mira un jarrón con rosas y tulipanes.",
    "Square composition in intense colors: orange, purple and red circles over a floral paper background. A girl in a yellow skirt and dark hat holds a jug, a red monkey with a green hoop crouches, and a boy in a green shirt looks at a vase with roses and tulips."
  ),
  "obra-71": d(
    "Pintura dentro de un marco antiguo de madera gris y dorada, con flores naturales de orquídea, girasol y hojas que salen por el lado derecho. En la escena roja y verde hay dos niñas con ropa tradicional, ocho siluetas negras de duendes en fila y un círculo con animales. Acrílico y óleo sobre lienzo, marco y flores.",
    "Painting inside an old gray and gold wooden frame, with natural orchid and sunflower flowers and leaves spilling out on the right side. In the red and green scene there are two girls in traditional clothing, eight black silhouettes of elves in a row, and a circle with animals. Acrylic and oil on canvas, frame and flowers."
  ),
  "obra-72": d(
    "Pintura vertical y estrecha sobre fondo negro salpicado de pequeñas estrellas de colores. En el centro hay una figura clara, casi blanca, con rostro de payaso, una cabeza roja de animal con collar azul y zapatillas de ballet azules. Hay manchas y salpicaduras blancas que se extienden hacia abajo y a los lados, con toques turquesa y rojo.",
    "Tall, narrow painting on a black background scattered with small colored stars. In the center is a pale, almost white figure with a clown-like face, a red animal head with a blue collar, and blue ballet shoes. White stains and splashes spread downward and to the sides, with touches of turquoise and red."
  ),
  "obra-73": d(
    "Composición vertical sobre fondo oscuro con estrellas de cinco puntas verdes, naranjas y rojas. Varias cabezas se apilan: un cráneo gris, un rostro pálido con nariz roja, un hombre barbudo de cabello naranja y una mujer de piel rosada de cuyo cuerpo cae un chorro rosa. Abajo hay unas botas rojas y, a la derecha, un brazo con huesos a la vista.",
    "Vertical composition on a dark background with green, orange and red five-pointed stars. Several heads are stacked: a gray skull, a pale face with a red nose, a bearded man with orange hair, and a pink-skinned woman with a pink stream falling from her body. At the bottom are red boots and, on the right, an arm with bones showing."
  ),
  "obra-74": d(
    "Pintura vertical con marco verde y fondo oscuro con manchas blancas y doradas. A la derecha hay un personaje de pelo naranja y rostro alargado que sostiene un pequeño insecto con alas, y debajo un jarrón rojo y verde. Se ven pies y manos rojos recortados, una cara con ojos azules y grandes estrellas verdes de cinco puntas.",
    "Vertical painting with a green frame and a dark background with white and gold stains. On the right is a figure with orange hair and an elongated face holding a small winged insect, with a red and green vase below. Cut-out red feet and hands, a face with blue eyes and large green five-pointed stars are visible."
  ),
  "obra-75": d(
    "Conjunto horizontal sobre fondo gris claro: arriba, cinco discos con estrellas de cinco puntas en crema, salmón, verde oliva, granate y negro. Debajo, una larga banda ondulada reúne escenas pequeñas: dos niños abrazados, flores en jarrones, figuras de pie y estrellas grandes. Un pequeño óvalo oscuro aparece a la izquierda.",
    "Horizontal group on a light gray background: at the top, five discs with five-pointed stars in cream, salmon, olive green, maroon and black. Below, a long wavy band holds small scenes: two embracing children, flowers in vases, standing figures and large stars. A small dark oval appears on the left."
  ),
  "obra-76": d(
    "Dos pinturas circulares sobre fondo gris claro, ejecutadas en acrílico y óleo sobre lienzo. La de la izquierda es crema con borde azul pálido, una estrella negra y una forma roja y verde, además de círculos lila y amarillo. La de la derecha es salmón, con una estrella roja y crema y círculos violeta y verde.",
    "Two circular paintings on a light gray background, made in acrylic and oil on canvas. The left one is cream with a pale blue edge, a black star and a red and green shape, plus lilac and yellow circles. The right one is salmon, with a red and cream star and violet and green circles."
  ),
  "obra-77": d(
    "Dos pinturas circulares sobre fondo gris claro, en acrílico y óleo sobre lienzo. La de la izquierda es granate, con varias estrellas naranjas y verdes de distinto tamaño y círculos rojos y rosa. La de la derecha es negra, con una gran estrella naranja, roja y crema, una estrella verde pequeña al centro y un fragmento turquesa y rojo.",
    "Two circular paintings on a light gray background, in acrylic and oil on canvas. The left one is maroon, with several orange and green stars of different sizes and red and pink circles. The right one is black, with a large orange, red and cream star, a small green star at the center and a turquoise and red fragment."
  ),
  "obra-78": d(
    "Dos piezas sobre fondo gris claro, en acrílico sobre lienzo. A la izquierda, un óvalo negro con un esqueleto con corona y alas translúcidas que sostiene un girasol sobre agua azul. A la derecha, un disco verde oliva con una estrella de cinco puntas en rojo, naranja, crema, amarillo y verde, con un centro azul.",
    "Two pieces on a light gray background, in acrylic on canvas. On the left, a black oval with a skeleton wearing a crown and translucent wings, holding a sunflower over blue water. On the right, an olive green disc with a five-pointed star in red, orange, cream, yellow and green, with a blue center."
  ),
  "obra-79": d(
    "Pintura en acrílico y óleo sobre lienzo, con marco negro. Un disco verde brillante contiene a un hombre barbudo y sin camisa, con una piel azulada en la cintura. Detrás hay dos niñas, una con vestido rojo, y sobre el fondo negro se ven dibujos finos de plantas. A la derecha hay flores rojas y blancas en un vaso y dos estrellas negras.",
    "Painting in acrylic and oil on canvas, with a black frame. A bright green disc contains a bearded, shirtless man with a bluish fur wrap at his waist. Behind him are two girls, one in a red dress, and fine plant drawings appear on the black background. On the right are red and white flowers in a vase and two black stars."
  ),
  "obra-80": d(
    "Pintura en acrílico y óleo sobre lienzo montado en madera tallada, con marco negro. Un disco rojo muestra a una figura de pelo largo y piel de animal que carga a un niño de cabello verde. A la izquierda hay un jarrón oscuro con ramas de flores amarillas. A la derecha, un hombre verde de perfil y una silueta blanca sobre el fondo negro.",
    "Painting in acrylic and oil on canvas mounted on carved wood, with a black frame. A red disc shows a long-haired figure in an animal skin carrying a green-haired child. On the left is a dark vase with branches of yellow flowers. On the right, a green man in profile and a white silhouette on the black background."
  ),
  "obra-81": d(
    "Pintura en acrílico y óleo sobre lienzo montado en madera tallada. Es un detalle visto de lado: sobre un disco rojo, una figura de pelo oscuro abraza a un niño de cabello verde. A la derecha asoma un personaje de ropa verde con una banda roja, y el fondo negro muestra líneas finas claras. A la izquierda se ven ramas amarillas.",
    "Painting in acrylic and oil on canvas mounted on carved wood. It is a detail seen from the side: on a red disc, a dark-haired figure embraces a green-haired child. On the right appears a figure in green clothing with a red sash, and the black background shows fine light lines. Yellow branches are visible on the left."
  ),
  "obra-82": d(
    "Fotografía de un detalle de la obra, tomada de lado y de cerca. Se ve una figura de pelo oscuro que abraza a un niño de cabello verde sobre fondo rojo, con tonos naranja y rosa en la piel. A la derecha hay una figura con ropa verde y una banda roja, junto a un fondo negro con vetas claras.",
    "Photograph of a detail of the work, taken from the side and up close. A dark-haired figure embraces a green-haired child on a red background, with orange and pink tones in the skin. On the right is a figure in green clothing with a red sash, next to a black background with light streaks."
  ),
  "obra-83": d(
    "Fotografía de dos obras en acrílico y óleo sobre lienzo, dentro de cajas blancas. Arriba, una pieza horizontal con bloques planos lila, amarillo, verde y naranja, y una pequeña figura con orejas rojas. Abajo, dos lienzos: uno con manchas de color y pájaros blancos, otro con una figura coronada y formas blancas y rojas.",
    "Photograph of two works in acrylic and oil on canvas, inside white boxes. At the top, a horizontal piece with flat blocks of lilac, yellow, green and orange, and a small figure with red ears. Below, two canvases: one with color patches and white birds, the other with a crowned figure and white and red shapes."
  ),
  "obra-84": d(
    "Fotografía de dos obras en acrílico y óleo sobre lienzo. A la izquierda, un hombre desnudo y delgado, de piel pálida y manos rojas, sentado sobre fondo marrón oscuro, con una franja verde sobre la cabeza. A la derecha, en marco dorado, formas triangulares rosas, verdes, amarillas y negras sobre beige y fondo oscuro.",
    "Photograph of two works in acrylic and oil on canvas. On the left, a thin naked man with pale skin and red hands, seated against a dark brown background, with a green band above his head. On the right, in a gold frame, pink, green, yellow and black triangular shapes on beige and a dark background."
  ),
  "obra-85": d(
    "Fotografía de cuatro pinturas en acrílico y óleo sobre lienzo. Arriba a la izquierda, una figura con pico rojo y alas sobre fondo oscuro. Arriba a la derecha, una bota roja sobre un fondo crema con franjas verdes. Abajo, un animal amarillo y una mujer de pelo largo con una pequeña ala verde.",
    "Photograph of four paintings in acrylic and oil on canvas. Top left, a figure with a red beak and wings on a dark background. Top right, a red boot on a cream background with green stripes. Below, a yellow animal and a long-haired woman with a small green wing."
  ),
  "obra-86": d(
    "Fotografía de cuatro obras en acrílico y óleo sobre lienzo. Arriba a la izquierda, una figura blanca con sombrero puntiagudo entre muchos ojos, junto a un círculo negro. Arriba a la derecha, un personaje de sombrero verde sobre fondo amarillo, con el texto «¿Y luego?». Abajo, un collage de círculos sobre cartón y una escena roja con un esqueleto.",
    "Photograph of four works in acrylic and oil on canvas. Top left, a white figure in a pointed hat among many eyes, next to a black circle. Top right, a figure in a green hat on a yellow background, with the text “¿Y luego?”. Below, a collage of circles on cardboard and a red scene with a skeleton."
  ),
  "obra-87": d(
    "Composición de cuatro lienzos agrupados: un hombre desnudo sentado en un tronco pesca con una caña un pequeño muñeco colgado; un personaje de abrigo naranja y sombrero verde sobre fondo violeta; una mancha oscura con trazos verdes sobre fondo claro; y una figura femenina de rojo sobre fondo rojo. Acrílico y óleo sobre lienzo.",
    "Composition of four canvases grouped together: a seated nude man on a tree stump fishing with a rod for a small dangling doll; a figure in an orange coat and green hat on a violet background; a dark stain with green strokes on a light background; and a female figure in red on a red background. Acrylic and oil on canvas."
  ),
  "obra-88": d(
    "Lienzo muy vertical con marco rojo y borde naranja. Una figura oscura de cabeza redonda y un ojo azul, con dientes visibles y un collar de pequeños cráneos, se alarga hacia abajo entre manchas grises y marrones atravesadas por hilos finos. Acrílico y óleo sobre lienzo.",
    "Very tall vertical canvas with a red frame and orange border. A dark figure with a round head and a blue eye, visible teeth and a necklace of small skulls, stretches downward among gray and brown stains crossed by thin threads. Acrylic and oil on canvas."
  ),
  "obra-89": d(
    "Lienzo vertical de fondo verde oliva cubierto de pequeñas flores amarillas y rojas. En el centro, una figura de cara naranja con ojos saltones y gorro rojo, sobre una mancha gris y roja que sube hacia arriba. Al pie se lee el título. Acrílico y óleo sobre lienzo.",
    "Vertical canvas with an olive-green background covered in small yellow and red flowers. At the center, a figure with an orange face, bulging eyes and a red cap, over a gray and red stain that rises upward. The title is written at the bottom. Acrylic and oil on canvas."
  ),
  "obra-90": d(
    "Lienzo vertical de fondo rojo intenso con borde marrón. Arriba, un cráneo grisáceo de ojos oscuros y una lágrima azul; una franja negra desciende hasta una cabeza con bigote y pajarita. A la izquierda, una pequeña barca azul con círculos amarillo y naranja. Acrílico y óleo sobre lienzo.",
    "Vertical canvas with an intense red background and a brown border. At the top, a grayish skull with dark eyes and a blue tear; a black band descends to a head with a mustache and bow tie. On the left, a small blue boat with yellow and orange circles. Acrylic and oil on canvas."
  ),
  "obra-91": d(
    "Lienzo vertical de fondo negro con salpicaduras blancas. Un personaje de perfil con barba verde y azul fuma una pipa, con mechones naranjas a los lados; encima, una cabeza con sombrero azul, y debajo, un muñeco pequeño de rostro gris. Acrílico y óleo sobre lienzo.",
    "Vertical canvas with a black background and white splatters. A figure in profile with a green and blue beard smokes a pipe, with orange tufts on either side; above it, a head with a blue hat, and below, a small doll with a gray face. Acrylic and oil on canvas."
  ),
  "obra-92": d(
    "Tríptico horizontal: dos paneles con jarrones de flores sobre mesas redondas, con girasol, agapantos y flores rojas, y entre ellos un panel central oscuro con siluetas grabadas. Fondos de verde, violeta, rojo y blanco, y marcos negros con tallado. Acrílico y óleo sobre lienzo y madera tallada.",
    "Horizontal triptych: two panels with vases of flowers on round tables, with a sunflower, agapanthus and red flowers, and between them a dark central panel with engraved silhouettes. Green, violet, red and white backgrounds, and black carved frames. Acrylic and oil on canvas and carved wood."
  ),
  "obra-93": d(
    "Jarrón alto y un florero pequeño con girasol, agapantos y flores rojas sobre una mesa redonda oscura. Detrás, bandas de verde, rojo y violeta, círculos claros y ramas con frutas. Un marco negro con tallado de trazos blancos rodea la imagen. Acrílico y óleo sobre lienzo.",
    "A tall vase and a small flower vase with a sunflower, agapanthus and red flowers on a dark round table. Behind them, bands of green, red and violet, light circles and branches with fruit. A black frame carved with white strokes surrounds the image. Acrylic and oil on canvas."
  ),
  "obra-94": d(
    "Jarrón alto y un florero pequeño con girasol, agapantos y flores rojas y amarillas sobre una mesa redonda roja oscura. Un gran círculo blanco ocupa el fondo, con tonos violeta, rosa y turquesa y esferas de colores. Marco negro tallado con siluetas. Acrílico y óleo sobre lienzo, marco tallado.",
    "A tall vase and a small flower vase with a sunflower, agapanthus and red and yellow flowers on a dark red round table. A large white circle fills the background, with violet, pink and turquoise tones and colored spheres. Black frame carved with silhouettes. Acrylic and oil on canvas, carved frame."
  ),
  "obra-95": d(
    "Siete lienzos pequeños agrupados en dos filas: una niña con un ave oscura, un cráneo claro con ojos verdes, una joven de rojo sentada, un niño sobre círculo verde, dos figuras con kimono, dos payasos de azul y un hombre sentado de verde. Colores saturados y fondos con círculos. Acrílico y óleo sobre lienzo.",
    "Seven small canvases grouped in two rows: a girl with a dark bird, a pale skull with green eyes, a young woman in red seated, a boy over a green circle, two figures in kimonos, two clowns in blue and a seated man in green. Saturated colors and backgrounds with circles. Acrylic and oil on canvas."
  ),
  "obra-96": d(
    "Siete lienzos pequeños agrupados en dos filas, con niños de ropas antiguas: tres niños con una estrella sobre fondo violeta, una niña con zancudas y un paraguas, dos niños corriendo de la mano, una niña con un ave roja, y figuras con abrigos. Fondos de círculos rojos y verdes. Acrílico y óleo sobre lienzo.",
    "Seven small canvases grouped in two rows, with children in old-fashioned clothes: three children with a star on a violet background, a girl with wading birds and an umbrella, two children running hand in hand, a girl with a red bird, and figures in coats. Backgrounds of red and green circles. Acrylic and oil on canvas."
  ),
  "obra-97": d(
    "Ocho lienzos pequeños agrupados en dos filas, con niñas y figuras de ropas antiguas sobre círculos y formas de color: dos niñas abrazadas, una con sombrero naranja, otra con gorro de cocinera junto a un ave verde, y un cráneo entre figuras. Dominan rojo, violeta, verde y naranja. Acrílico y óleo sobre lienzo.",
    "Eight small canvases grouped in two rows, with girls and figures in old-fashioned clothes over circles and color shapes: two girls embracing, one with an orange hat, another in a cook's cap beside a green bird, and a skull among figures. Red, violet, green and orange dominate. Acrylic and oil on canvas."
  ),
  "obra-98": d(
    "Dos lienzos horizontales apilados. Arriba, cinco muñecas con trajes de época sobre fondo rojo, con plantas oscuras en primer plano. Abajo, cuatro muñecas con velo, kimono, pañuelo y gorro de piel sobre fondo verde agua. Acrílico y óleo sobre tela.",
    "Two horizontal canvases stacked. Above, five dolls in period costumes on a red background, with dark plants in the foreground. Below, four dolls with a veil, a kimono, a headscarf and a fur hat on an aqua-green background. Acrylic and oil on canvas."
  ),
  "obra-99": d(
    "Dos lienzos horizontales apilados. Arriba, cuatro muñecas con trajes tradicionales ante un fondo azul, con plantas negras en primer plano. Abajo, en marco claro, una niña con pañuelo a la izquierda y otra sentada al centro, con siluetas negras y fondo rojo. Acrílico y óleo sobre tela.",
    "Two horizontal canvases stacked. Above, four dolls in traditional costumes against a blue background, with black plants in the foreground. Below, in a light frame, a girl with a headscarf on the left and another seated at the center, with black silhouettes and a red background. Acrylic and oil on canvas."
  ),
  "obra-100": d(
    "Lienzo horizontal de fondo salmón con un jarrón alto y un florero pequeño sobre una mesa redonda oscura, con girasol y flores azules. Al fondo, una mujer de perfil con flores rojas, un candelabro violeta, círculos blancos y siluetas negras de plantas. Acrílico y óleo sobre tela.",
    "Horizontal canvas with a salmon background showing a tall vase and a small flower vase on a dark round table, with a sunflower and blue flowers. Behind them, a woman in profile with red flowers, a violet chandelier, white circles and black plant silhouettes. Acrylic and oil on canvas."
  ),
  "obra-101": d(
    "Cuadro cuadrado dividido en dos mitades: a la izquierda, fondo rosa con círculos y una figura naranja de tres ojos con palmeras sobre la cabeza; a la derecha, fondo negro con el personaje barbudo que fuma pipa. Borde violeta y manchas grises. Acrílico y óleo sobre tela.",
    "Square painting divided in two halves: on the left, a pink background with circles and an orange three-eyed figure with palm trees above its head; on the right, a black background with the bearded figure smoking a pipe. Violet border and gray stains. Acrylic and oil on canvas."
  ),
  "obra-102": d(
    "Gota de sangre, acrílico y óleo sobre lienzo, de 2009. Una figura roja de tres ojos, con dos palmeras sobre la cabeza, está formada por brazos horizontales y piernas delgadas que terminan en un pie grande. El fondo rosa lleva círculos blancos, rojos y azules, manchas grises y marrones, y un marco morado.",
    "Gota de sangre, acrylic and oil on canvas, from 2009. A red three-eyed figure with two palm trees on its head is built from horizontal arms and thin legs ending in a large foot. The pink background carries white, red and blue circles, grey and brown stains, and a purple border."
  ),
  "obra-103": d(
    "Danza en el bosque, acrílico y óleo, de 2009. Sobre un fondo rojo, una niña con sombrero verde y vestido naranja sostiene una rama donde se posa un colibrí. Detrás hay pinos oscuros y círculos anaranjados. Abajo, un gato negro mira a una fila de pequeñas figuras verdes y otro colibrí vuela cerca.",
    "Danza en el bosque, acrylic and oil, from 2009. Against a red background, a girl in a green hat and orange dress holds a branch where a hummingbird perches. Behind her are dark pine trees and orange circles. Below, a black cat looks at a row of small green figures, and another hummingbird flies nearby."
  ),
  "obra-104": d(
    "Como una espina, acrílico y óleo, de 2006. A la derecha, un rostro blanco con una máscara verde sobre la nariz y un sombrero naranja con manchas lleva una segunda cara pequeña junto al ojo. Lo rodea un fondo de triángulos de colores. A la izquierda, un panel rosa muestra una estrella dorada, ojos y pequeñas esferas rojas, con texto escrito.",
    "Como una espina, acrylic and oil, from 2006. On the right, a white face with a green mask over the nose and a spotted orange hat carries a second small face beside the eye. It is surrounded by a background of coloured triangles. On the left, a pink panel shows a golden star, eyes and small red spheres, with handwritten text."
  ),
  "obra-105": d(
    "Sangrar el horizonte, acrílico y óleo, de 2006. Tres paneles rosados sobre un fondo lila: en el primero, dos huevos fritos unidos por una línea; en el segundo, un árbol seco, una figura con ojos y un personaje peludo con un pollito en un cuenco; abajo, una rosa en un tallo largo con tres hilos que cuelgan.",
    "Sangrar el horizonte, acrylic and oil, from 2006. Three pink panels on a lilac background: in the first, two fried eggs joined by a line; in the second, a bare tree, a figure with eyes and a furry character with a chick in a bowl; below, a rose on a long stem with three hanging threads."
  ),
  "obra-106": d(
    "Adán, acrílico y óleo, de 2006. El fondo pasa del amarillo arriba al crema y al rojizo abajo. En el centro hay figuras dibujadas de manera tenue: una mujer con una vasija y una cesta, niños con pañuelos rojos y un gallo. Una silueta verde con una forma blanca y ovalada como cabeza se apoya sobre dos pies en una base marrón.",
    "Adán, acrylic and oil, from 2006. The background shifts from yellow at the top to cream and reddish at the bottom. In the centre are faintly drawn figures: a woman with a jug and a basket, children with red scarves, and a rooster. A green silhouette with a white oval shape for a head stands on two feet on a brown base."
  ),
  "obra-107": d(
    "Eva, acrílico y óleo, de 2006. Sobre un fondo amarillo y crema con una franja rojiza abajo, una figura blanca de largas piernas tiene un ojo en forma de diana y un pico alargado. A la derecha se apilan niños con pañuelos rojos y una mujer con falda, dibujados con trazo suelto. Un perrito pequeño pasa entre las piernas.",
    "Eva, acrylic and oil, from 2006. On a yellow and cream background with a reddish band at the bottom, a white figure with long legs has a target-shaped eye and an elongated beak. On the right, children with red scarves and a woman in a skirt are stacked, drawn with loose strokes. A small dog passes between the legs."
  ),
  "obra-108": d(
    "El enigma 2, acrílico y óleo, de 2006. A la izquierda, dos niños se abrazan bajo un árbol grande sobre un fondo rojo y azul oscuro. A la derecha, sobre una zona clara, un niño con pantalón rojo y una niña con trenzas están de pie. En el centro flotan flores blancas, libros rojos y un óvalo amarillo con un islote.",
    "El enigma 2, acrylic and oil, from 2006. On the left, two children embrace under a large tree against a dark red and blue background. On the right, on a pale area, a boy in red shorts and a girl with braids stand together. In the centre, white flowers, red books and a yellow oval holding a small island float."
  ),
  "obra-109": d(
    "Vestido de agua, acrílico y óleo, de 2006. Un paisaje de cielo azul claro con un árbol grande a la izquierda, en cuyas ramas se sienta una figura azul. Hay nubes azules planas, ramas sueltas que gotean, un árbol seco y una casa pequeña con humo a la derecha. Abajo, el horizonte pasa del verde al rojo y al naranja.",
    "Vestido de agua, acrylic and oil, from 2006. A light blue sky landscape with a large tree on the left, a blue figure seated in its branches. There are flat blue clouds, loose dripping branches, a bare tree and a small house with smoke on the right. Below, the horizon shifts from green to red and orange."
  ),
  "obra-110": d(
    "Cinco puntos cardinales, acrílico y óleo, de 2006. Sobre un fondo azul pálido hay una silueta blanca de una figura de pie, con su sombra gris detrás. Cuatro círculos negros grandes se reparten por el lienzo. A la derecha, flores, hojas y colibríes naranjas y verdes están unidos por líneas negras finas a pequeñas figuras.",
    "Cinco puntos cardinales, acrylic and oil, from 2006. On a pale blue background there is a white silhouette of a standing figure, with its grey shadow behind. Four large black circles are spread across the canvas. On the right, orange and green flowers, leaves and hummingbirds are linked by thin black lines to small figures."
  ),
  "obra-111": d(
    "Allá, óleo y acrílico sobre lienzo, en formato circular. Un niño con abrigo rojo levanta la mano hacia un sol de rayos oscuros sobre un fondo naranja. Frente a él hay cuatro ranas verdes con manchas rojas, una vaca lejana, una valla y una franja rosa en el horizonte.",
    "Allá, oil and acrylic on canvas, in a circular format. A child in a red coat raises a hand toward a sun with dark rays against an orange background. In front of the child are four green frogs with red spots, a distant cow, a fence and a pink strip at the horizon."
  ),
  "obra-112": d(
    "El espejo, óleo y acrílico sobre lienzo, en formato circular. Un niño de pelo rizado y camiseta de rayas sujeta con las manos dos patas largas de un ave blanca de alas abiertas. A la izquierda, un lobo de hocico abierto está en el agua. El fondo es verde azulado, con un óvalo amarillo, palmeras y orillas verdes.",
    "El espejo, oil and acrylic on canvas, in a circular format. A curly-haired child in a striped shirt grips two long legs of a white bird with open wings. On the left, a wolf with open jaws stands in the water. The background is teal, with a yellow oval, palm trees and green banks."
  ),
  "obra-113": d(
    "Pájaro del buen abuelo, acrílico y óleo, de 2008, en formato circular. Un anciano de barba blanca y un halo dorado está sentado a la derecha rodeado de niños con ropa antigua, uno de ellos con un conejo blanco. Un colibrí grande ocupa la parte superior y una niña salta la cuerda. El título aparece escrito abajo.",
    "Pájaro del buen abuelo, acrylic and oil, from 2008, in a circular format. An old man with a white beard and a golden halo sits on the right surrounded by children in old-fashioned clothes, one holding a white rabbit. A large hummingbird fills the upper part and a girl skips rope. The title is written at the bottom."
  ),
  "obra-114": d(
    "Nada entonces tiene semejante emoción, acrílico y óleo, de 2008, en formato circular. Sobre un fondo rojo, una niña con sombrero verde y falda roja está de pie sobre un tocón, junto a una rosa. Hay soles naranjas, árboles en rojo más oscuro, una sombra negra de ramas, ratones sobre una barra y un gato negro.",
    "Nada entonces tiene semejante emoción, acrylic and oil, from 2008, in a circular format. Against a red background, a girl in a green hat and red skirt stands on a tree stump next to a rose. There are orange suns, darker red trees, a black shadow of branches, mice on a bar and a black cat."
  ),
  "obra-115": d(
    "Universo bajo los pies 2, acrílico y óleo sobre lienzo, de 2009, en formato circular. Sobre un fondo verde azulado, un niño camina con un sombrero en la espalda y una niña de azul se sienta entre flores amarillas. Discos negros con líneas rojas, un colibrí, una rosa roja y una sombra de hojas con puntos blancos rodean a las figuras.",
    "Universo bajo los pies 2, acrylic and oil on canvas, from 2009, in a circular format. On a teal background, a boy walks with a hat on his back and a girl in blue sits among yellow flowers. Black discs with red lines, a hummingbird, a red rose and a leaf shadow with white dots surround the figures."
  ),
  "obra-116": d(
    "Danzando sobre la nada-2, acrílico y óleo sobre tela, de 2009. A la izquierda, sobre una franja roja, un conejo rojo y negro de gran sonrisa se apoya en una esfera negra. En el centro y a la derecha, sobre fondo crema, hay dos plantas con ojos, picos de aves, una figura gris de un niño con gorra y una cabeza roja con tres ojos.",
    "Danzando sobre la nada-2, acrylic and oil on canvas, from 2009. On the left, on a red band, a red and black rabbit with a wide smile leans on a black sphere. In the centre and on the right, on a cream background, there are two plants with eyes, bird beaks, a grey figure of a boy in a cap and a red head with three eyes."
  ),
  "obra-117": d(
    "Una niña de pelo rojo, vestido azul con manchas claras y zapatos rojos, está sentada con una mano en la boca y sostiene una muñeca pequeña. Ambas aparecen dentro de un círculo oscuro con borde celeste, sobre un fondo azul profundo. Arriba, formas oscuras de aspecto vegetal sobresalen del círculo. Acrílico y óleo.",
    "A red-haired girl in a blue dress with light spots and red shoes sits with one hand at her mouth, holding a small doll. Both appear inside a dark circle with a light blue edge, on a deep blue background. Above, dark plant-like shapes stick out of the circle. Acrylic and oil."
  ),
  "obra-118": d(
    "Una figura de cabeza deformada, con ojos grandes sobre tallos, dientes visibles y un huevo frito en la mejilla, cruza los brazos sobre un fondo gris azulado. Detrás tiene un disco naranja con borde azul. Lleva un cuello de gotas azules, y abajo se lee «MONA LISA». Una tira roja pintada asoma por arriba. Acrílico y óleo.",
    "A figure with a distorted head, big eyes on stalks, visible teeth and a fried egg on its cheek folds its arms against a blue-grey background. Behind it is an orange disc with a blue edge. It wears a collar of blue drops, and the words “MONA LISA” are lettered at the bottom. A painted red strip sticks out at the top. Acrylic and oil."
  ),
  "obra-119": d(
    "Sobre un fondo naranja, un círculo oscuro con borde verde reúne una tetera azul con rostro, una cabeza blanca de pintura espesa sobre una esfera roja y un hombre azul con sombrero lila y brazos cruzados. A la izquierda, esferas blancas y lilas se apilan en columna. Acrílico y óleo.",
    "On an orange background, a dark circle with a green edge holds a blue teapot with a face, a white head in thick paint above a red sphere, and a blue man in a lilac hat with crossed arms. On the left, white and lilac spheres are stacked in a column. Acrylic and oil."
  ),
  "obra-120": d(
    "Dos mujeres de rasgos orientales, con túnicas claras y moños, caminan junto a una cerca lila en un paisaje de tonos tierra. A la derecha, un tronco oscuro con ramas de hojas rojas ocupa el borde. Círculos con motivos florales flotan sobre la escena, rodeada por un marco de papel floral. Acrílico y óleo sobre lienzo.",
    "Two women with East Asian features, in light robes and hair buns, walk beside a lilac fence in an earth-toned landscape. On the right, a dark trunk with red-leafed branches fills the edge. Circles with floral patterns float over the scene, which is surrounded by a floral-paper border. Acrylic and oil on canvas."
  ),
  "obra-121": d(
    "Sobre un fondo rojo, un huevo frito grande con la yema amarilla ocupa la parte alta, delante de un disco azul oscuro. Abajo a la derecha aparece un torso de hombre con medio rostro verde, y detrás otra cara. A la izquierda hay una criatura con orejas largas y un árbol en un paisaje al atardecer. Acrílico y óleo.",
    "On a red background, a large fried egg with a yellow yolk fills the upper part, in front of a dark blue disc. At lower right is a man's torso with a half-green face, and another face behind it. At left are a creature with long ears and a tree in a dusk landscape. Acrylic and oil."
  ),
  "obra-122": d(
    "Una escena de estilo indio muestra un elefante oscuro con dos jinetes de túnica naranja y dos hombres a pie, sobre un desierto de color arena. Una figura roja y verde, alargada y de rostro frontal, cruza la imagen en vertical. Esferas oscuras flotan en el cielo, y una tela floral oscura enmarca el cuadro. Acrílico y óleo.",
    "An Indian-style scene shows a dark elephant with two riders in orange robes and two men on foot, over a sand-coloured desert. An elongated red and green figure with a frontal face crosses the image vertically. Dark spheres float in the sky, and a dark floral fabric frames the picture. Acrylic and oil."
  ),
  "obra-123": d(
    "Dos niñas pequeñas de aspecto antiguo, en un rectángulo naranja con marco rojo oscuro. Una está de pie con la cabeza baja, con gotas azules cayendo de su ropa y canicas azules en el suelo. La otra, sentada, extiende la mano hacia una figura de hada. Tres círculos azul, verde y rojo cubren partes de la escena. Acrílico.",
    "Two small children in an old-fashioned style, in an orange rectangle with a dark red frame. One stands with her head down, blue drops falling from her clothes and blue marbles on the ground. The other, seated, reaches toward a fairy figure. Three circles, blue, green and red, cover parts of the scene. Acrylic."
  ),
  "obra-125": d(
    "Sobre un fondo azul, cuatro niños con sombreros y ropa de época se distribuyen por la escena, dos de ellos inclinados hacia delante. Un sol naranja asoma arriba a la izquierda. Aves oscuras de pico largo y flores rosadas atraviesan el centro entre ramas verdes. El marco es oscuro. Acrílico y óleo.",
    "On a blue background, four children in hats and period clothes are spread across the scene, two of them bending forward. An orange sun appears at upper left. Dark long-billed birds and pink flowers cross the centre among green branches. The frame is dark. Acrylic and oil."
  ),
  "obra-126": d(
    "En un marco rojo, dos niños pequeños con sombrero se enfrentan sobre fondo claro: una niña sentada dentro de un círculo azul y otra figura de pie dentro de uno rojo. Un colibrí largo con flores cuelga entre ambos y otro vuela arriba a la izquierda. Siluetas oscuras de hojas se superponen. Acrílico y óleo.",
    "In a red frame, two small children in hats face each other on a light background: a girl seated inside a blue circle and another figure standing inside a red one. A long hummingbird with flowers hangs between them and another flies at upper left. Dark leaf silhouettes overlap the scene. Acrylic and oil."
  ),
  "obra-127": d(
    "Una niña de pelo suelto y vestido blanco está sentada en el centro, sobre una mancha verde y rodeada de puntos blancos. A la izquierda, un círculo naranja con figuras pequeñas; a la derecha, colibríes y flores. Una fila de muñecos asoma arriba, sobre un fondo naranja con marco rojo. Acrílico y óleo sobre tela.",
    "A girl with loose hair and a white dress sits in the centre, on a green patch and surrounded by white dots. At left is an orange circle with small figures; at right, hummingbirds and flowers. A row of dolls appears at the top, on an orange background with a red frame. Acrylic and oil on canvas."
  ),
  "obra-128": d(
    "Sobre un fondo azul intenso, un rectángulo claro y ladeado contiene una silueta lila de flores grandes en el centro. A los lados hay dos círculos pequeños, uno con un perro y aves azules sobre una rama, otro con dos niños que caminan. Siluetas de plantas oscuras y círculos blancos cubren los bordes. Acrílico y óleo.",
    "On an intense blue background, a tilted light rectangle holds a large lilac flower silhouette at the centre. At the sides are two small circles, one with a dog and blue birds on a branch, the other with two children walking. Dark plant silhouettes and white circles cover the edges. Acrylic and oil."
  ),
  "obra-129": d(
    "Una niña con sombrero verde y vestido rojo se arrodilla frente a un nido con huevos, sobre una forma circular lila. A la izquierda, un círculo claro muestra siluetas lilas de plantas y dos pequeños cuadrados rojos unidos por líneas finas. El fondo es azul intenso, con un marco claro detrás. Acrílico y óleo.",
    "A girl in a green hat and red dress kneels in front of a nest with eggs, on a lilac circular shape. At left, a light circle shows lilac plant silhouettes and two small red squares joined by thin lines. The background is deep blue, with a light frame behind. Acrylic and oil."
  ),
  "obra-131": d(
    "Una niña de pelo suelto y vestido blanco se sienta en el centro de un rectángulo gris, entre puntos blancos. A la izquierda, un ave de plumaje azul y cresta roja asoma abajo; a la derecha, dos colibríes vuelan. Arriba hay una fila de muñecos pequeños y círculos amarillos, dentro de un marco negro. Acrílico y óleo.",
    "A girl with loose hair and a white dress sits in the centre of a grey rectangle, among white dots. At left, a bird with blue plumage and a red crest appears at the bottom; at right, two hummingbirds fly. At the top is a row of small dolls and yellow circles, inside a black frame. Acrylic and oil."
  ),
  "obra-07": d(
    "Tres niñas ocupan la escena: una con sombrero verde y vestido rojo a la izquierda, otra de vestido amarillo con una flor en la mano al centro, y otra de pelo rojo y vestido verde a la derecha. Las rodean enredaderas, loros, una estrella gris y plantas oscuras, con tonos naranja y rojo. Técnica mixta sobre tabla.",
    "Three girls fill the scene: one in a green hat and red dress at left, another in a yellow dress holding a flower at centre, and another with red hair and a green dress at right. They are surrounded by vines, parrots, a grey star and dark plants, in orange and red tones. Mixed media on panel."
  ),
  "obra-08": d(
    "Una niña de sombrero verde con lunares y vestido rojo se agacha ante un nido con huevos, sobre un círculo lila. A la izquierda, un círculo claro muestra siluetas lilas de plantas y dos cuadrados rojos con líneas finas. El fondo es azul intenso con un recuadro celeste. Técnica mixta sobre tabla.",
    "A girl in a green polka-dot hat and red dress crouches before a nest with eggs, on a lilac circle. At left, a light circle shows lilac plant silhouettes and two red squares with thin lines. The background is deep blue with a pale blue panel. Mixed media on panel."
  ),
  "obra-09": d(
    "Cuatro aves de colores intensos sobre un fondo gris oscuro con flores negras brillantes: un ave azul con cresta blanca, un tucán de pico grande con plumaje amarillo y rojo, y un faisán rojo y amarillo que pisa agua con círculos concéntricos. Técnica mixta sobre tabla.",
    "Four brightly colored birds on a dark gray background with glossy black flowers: a blue bird with a white crest, a large-billed toucan with yellow and red plumage, and a red and yellow pheasant standing in water with concentric circles. Mixed media on panel."
  ),
  "obra-10": d(
    "Sobre un fondo gris oscuro con estrellas fugaces pequeñas, un faisán dorado de pecho azul turquesa ocupa la izquierda. A la derecha hay un jilguero amarillo sobre una flor y un faisán más pequeño abajo, junto a un jarrón negro con follaje oscuro. Técnica mixta sobre tabla.",
    "Against a dark gray background with small shooting stars, a golden pheasant with a turquoise chest fills the left side. On the right there is a yellow goldfinch on a flower and a smaller pheasant below, beside a black vase with dark foliage. Mixed media on panel."
  ),
  "obra-11": d(
    "Cuatro aves sobre un fondo azul claro con flores rojas y una estrella negra de ocho puntas: un colibrí de cabeza rosa y pecho azul dentro de un círculo blanco, otro verde y naranja sobre una rama, uno con cresta roja y un faisán en un óvalo oscuro. Técnica mixta sobre tabla.",
    "Four birds on a light blue background with red flowers and a black eight-pointed star: a hummingbird with a pink head and blue chest inside a white circle, another in green and orange on a branch, one with a red crest, and a pheasant in a dark oval. Mixed media on panel."
  ),
  "obra-12": d(
    "Tres colibríes y un faisán sobre fondo azul verdoso y morado, con flores rosadas dispersas y una estrella negra de puntas largas. Uno de los colibríes, de cabeza rosa, aparece dentro de un círculo blanco; el faisán rojo y amarillo está abajo a la derecha. Técnica mixta sobre tabla.",
    "Three hummingbirds and a pheasant on a blue-green and purple background, with scattered pink flowers and a black long-pointed star. One hummingbird, with a pink head, appears inside a white circle; the red and yellow pheasant is at the lower right. Mixed media on panel."
  ),
};
