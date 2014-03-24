// Hash the array and compare the arrays!
// Key
// a = small apple .small
// A = apple
// o = small orange, .small
// O = orange
// p = small pickle, .small
// P = pickle
// () = plate open / close
// {} = fancy plate open / close
// [] = bento open close tags

var levels = [
  {
    helpTitle : "Velg elementer etter deres type", //Select elements by their type
    selectorName : "Type-selektor", // Type Selector
    doThis : "Velg tallerkene", // Select the plates
    selector : "tallerken",
    syntax : "A",
    help : "Velg alle elementer av typen <strong>A</strong>. Type henviser til typen tagg, slik som <strong>div</strong>, <tag>p</tag> og <tag>ul</tag> alle er ulike typer.", // Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.
    examples : [
      '<strong>div</strong> velger alle <strong>&lt;div&gt;</strong> elementer.',
      '<strong>p</strong> velger alle <strong>&lt;p&gt;</strong> elementer.',
      ],
    board: "()()"
  },
  {
    doThis : "Velg bentoboksene", //Select the bento boxes
    selector : "bento",
    syntax : "A",
    helpTitle : "Velg bentoboksene", // Select elements by their type
    selectorName : "Velg etter type", // Type Selector
    help : "Velg alle elementer av typen <strong>A</strong>. Type henviser til typen tagg, slik som <strong>&lt;div&gt;</strong>, <strong>&lt;p&gt;</strong> og <strong>&lt;ul&gt;</strong> alle er ulike typer HTML-tagger.", //"Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples : [
      '<strong>div</strong> velger alle <strong>&lt;div&gt;</strong> elementer.',
      '<strong>p</strong> velger alle <strong>&lt;p&gt;</strong> elementer.',
      ],
    board: "[]()[]"
  },
  {
    doThis : "Velg den fancy tallerken", // Select the fancy plate
    selector : "#fancy",
    selectorName: "ID-Selektor",
    helpTitle: "Velg elementer med en ID", // Select elements with an ID
    syntax: "#id",
    help : 'I CSS leses nummer-tegnet (#) som id. Velg alle elementer som har <strong>id</strong> atributten. Du kan også kombinere ID-selektoren med type-selektoren. ', // Selects all elemoents element with that <strong>id</strong> attribute. You can also combine the ID selector with the type selector
    examples : [
      '<strong>#cool</strong> vil velge elementet med <strong>id="cool"</strong>', //will select any element with <strong>id="cool"</strong>
      '<strong>ul#lang</strong> vil velge elementet <strong>&lt;ul id="lang"&gt;</strong>'
    ],
    board: "{}()[]"
  },
  {
    helpTitle: "Velg et element inni et annet element", // Select an element inside another element
    selectorName : "Etterkommer-selektor", //Descendant Selector
    doThis : "Velg eplet på tallerkenen", //Select the apple on the plate
    selector : "tallerken eple",
    syntax: "A&nbsp;&nbsp;B",

    help : "Velger alle <strong>B</strong> inni <strong>A</strong>. Her er <strong>B</strong> etterkommer elementet, som betyr at et element er inni et annet.", // Selects all <strong>B</strong> inside of <strong>A</strong>. Here <strong>B</strong> is the descendant element, meaning an element that is inside of another element.
    examples : [
      '<strong>p&nbsp;&nbsp;strong</strong> vil velge alle <strong>&lt;strong&gt;</strong> som er etterkommere av et hvilket som helst <strong>&lt;p&gt;</strong>',
      '<strong>#fancy&nbsp;&nbsp;span</strong> vil velge alle <strong>&lt;span&gt;</strong> som er etterkommere av et hvilket som helst element med <strong>id="fancy"</strong>.',
    ],
    board: "[](A)A"
  },
  {
    doThis : "Velg agurken på den fancy tallerkenen", //Select the agurk on the fancy plate
    selector : "#fancy agurk",
    helpTitle: "Kombiner etterfølger og ID selektorer", // Combine the Descendant & ID Selectors
    syntax: "A&nbsp;&nbsp;#id",
    help : 'Du kan kombinere en hvilken som helst selektor med etterkommer-selektoren.', //You can combine any selector with the descendent selector.
    examples : [
      '<strong>#cool&nbsp;span</strong> vil velge alle <strong>&lt;span&gt;</strong> elementer som er inne elementer med <strong>id="cool"</strong>'
    ],
    board: "[O]{P}(P)"
  },
  {
    doThis : "Velg de små eplene", //Select the small apples
    selector : ".liten",
    selectorName: "Klasse-selektor",
    helpTitle: "Velg elementer etter deres klasse", // Select elements by their class
    syntax: ".klassenavn",
    help : 'Klasse-selektoren velger alle elementer med den klasse-artibutten', //The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.
    examples : [
    '<strong>.lekkert</strong> velger alle elementer med <strong>class="lekkert"</strong>' // <strong>.neato</strong> selects all elements with <strong>class="neato"</strong>
    ],

    board: "Aa(a)()"
  },
  {
    doThis : "Velg de små appelsinene", // Select the small oranges
    selector : "appelsin.liten",
    helpTitle: "Kombiner med klasse-selektoren", //Combine the Class Selector
    syntax: "A.klassenavn",
    help : 'Du kan kombinere klasse-selektoren med andre selektorer, som type-selektoren.', // You can combine the class selector with other selectors, like the type selector.
    examples : [
      '<strong>ul.viktig</strong> vil velge alle <strong>&lt;ul&gt;</strong> elementer som har <strong>class="viktig"</strong>',
      '<strong>#stor.bred</strong> vil velge alle elementer med <strong>id="stor"</strong> som også har <strong>class="bred"</strong>'
    ],
    board: "Aa[o](O)(o)"
  },
  {
    doThis : "Velg de små appelsinene i bentoboksene", //Select the small oranges in the bentos
    selector : "bento appelsin.liten",
    syntax: "x",
    helpTitle: "Dette får du til!", //You can do it...
    help : 'Kombiner det du har lært i de siste nivåene for å løse denne!', // Combine what you learned in the last few levels to solve this one!
    board: "A(o)[o][a][o]"
  },
  {
    doThis : "Velg alle tallerkene og bentoboksene", // Select all the plates and bentos
    selector : "tallerken,bento",
    selectorName : "Komma-kombinator", //Comma Combinator
    helpTitle: "Kombiner, selektorer, med... komma!", //Combine, selectors, with... commas!
    syntax : "A, B",
    help : 'Magisk, dette vil velge <strong>A</strong> og <strong>B</strong> elementer. Du kan kombinere alle selektorer på denne måten, og du kan spesifisere mer enn to.',
    examples: [
    '<strong>p, .gøy</strong> vil velge alle<strong>&lt;p&gt;</strong> elementer, <em>og</em> alle elementer med <strong>class="gøy"</strong>',
    '<strong>a, p, div</strong> vil velge alle <strong>&lt;a&gt;</strong>, <strong>&lt;p&gt;</strong> og <strong>&lt;div&gt;</strong> elementer.'
    ],
    board: "pP(P)[P](P)Pp"
  },
  {
    doThis : "Velg alt!",// Select all the things!
    selector : "*",
    selectorName:  "Universal-selektoren", //The Universal Selector
    helpTitle: "Du kan velge alt!", //You can select everything!
    syntax : "*",
    help : 'Med Universal-selektoren kan du velge alt. ',
    examples : [
      '<strong>p *</strong> vil velge alle elementer inni <strong>&lt;p&gt;</strong> elementer.' // will select every element inside all <strong>&lt;p&gt;</strong> elements
    ],
    board: "A(o)[][O]{)"
  },
  {
    doThis : "Velg alt på en tallerken", //Select everything on a plate
    selector : "tallerken *",
    syntax : "A&nbsp;&nbsp;*",
    helpTitle: "Kombiner med universalselektoren", //Combine the Universal Selector
    help : 'Velger alt inni <strong>A</strong>.', //This will select all elements inside of 
    examples : [
      '<strong>p *</strong> vil velge alle elementer inni alle <strong>&lt;p&gt;</strong> elementer', // will select every element inside all  elements.
      '<strong>ul.fancy *</strong> vil velge alle elementer inni alle <strong>&lt;ul class="fancy"&gt;</strong> elementer.' //will select every element inside all
    ],
    board: "{o}(P)a(A)"
  },
  {
    doThis : "Velg alle epler som er ved siden av en tallerken", // Select every apple that's next to a plate
    selector : "tallerken + eple", //plate + apple
    helpTitle: "Velger et element som følger rett etter et annet", // Select an element that directly follows another element
    selectorName: "Nærliggende søsken-selektor", // Adjacent Sibling Selector
    syntax : "A + B",
    help : "Dette velger alle <strong>B</strong> elementer som følger direkte etter <strong>A</strong>. Elementer som følger etter hverandre kalles søsken. De er på det samme nivået, eller dybde. <br/><br/>I HTML-visningen for dette nivået er elementer som har lik indentering (innrykk) søsken.", //This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same same level, or depth.  <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.
    examples : [
      '<strong>p + .intro</strong> vil velge alle elementer med <strong>class="intro"</strong> som kommer rett etter en <strong>&lt;p&gt;</strong>.', // <strong>p + .intro</strong> will select every element with <strong>class="intro"</strong> that directly follows an <tag>p</tag>
      '<strong>div + a</strong> vil velge alle <strong>&lt;a&gt;</strong>elementer som kommer rett etter en <strong>&lt;div&gt;</strong>' // <strong>div + a</strong> will select every <tag>a</tag> element that directly follows an <tag>div</tag>
    ],
    board: "[a]()a()Aaa"
  },
  {
    doThis : "Velg agurkene til høyre for bentoboksen", // Select every agurk to the right of the bento
    selector : "bento ~ agurk",
    syntax: "A ~ B",
    helpTitle: "Generell søsken-selektor", // General Sibling Selector
    help : "Du kan velge alle etterfølgende søsken av et element. Dette likner på <em>nærliggende søsken-selektor (A + B)</em>, bortsett fra at denne velger alle i stede for kun et.", //You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.
    examples : [
      '<strong>A ~ B</strong> vil velge alle <strong>B</strong> som følger etter en <strong>A</strong> i samme nivå.'
    ],
    board: "P[o]pP(P)(p)"
  },
  {
    doThis : "Velg eplet som ligger direkte på en tallerken", // Select the apple directly on a plate
    selector : "tallerken > eple", // plate > apple
    helpTitle: "Barne-selektor", // Child Selector
    syntax: "A > B",
    help : "Du kan velge elementer som er direkte 'barn' av et annet element. Et barne-element er et hvilket som helst element som ligger direkte (et nivå) under et annet. <br /><br /> Elementer som er dypere kalles etterkommer-elementer." , // You can select elements that are direct children of other elements. A child element is any element that is nested direclty in another element. <br><br>Elements that are nested deeper than that are called descendant elements.
    examples : [
      '<strong>A > B</strong> vil velge alle <strong>B</strong> som er barn av <strong>A</strong>.' // will select all <strong>B</strong> that are a direct children <strong>A</strong>
    ],
    board: "([A])(A)()Aa"
  },
  {
    doThis : "Velg den øveste appelsinen", // Select the top orange
    selector : "tallerken :first-child",
    syntax: ":first-child",
    helpTitle: "Første-barn pseudo-selektor", // First Child Pseudo-selector
    help : "Du kan velge det første barnet til et element. Du kan kombinere denne pseudo-selektoren (spesial-effekter til selektorer) med andre selektorer. Et barne-element som kommer først i et annet.<br /><br />Legge merke til at selektoren skrives på engelsk, og kan ikke oversettes hvis vi forventer at den skal virke i CSS.", // You can select the first child element in any other element. You can combine this pseudo-selector with other selectors. A child element is any element that is directly nested in another element.
    examples : [
      '<strong>:first-child</strong> velger alle første-barn-elementer', //selects all first-child elements.
      '<strong>p:first-child</strong> velger alle første-barn <strong>&lt;p&gt;</strong> elementer.', // selects all first-child 
      '<strong>div p:first-child</strong> velger aller første-barn <strong>&lt;p&gt;</strong> elementer som er inni en <strong>&lt;div&gt;</strong>.' // selects all first-child 
    ],
    board: "[]()(OOO)p"
  },
  {
    doThis : "Velg eplet og agurken på tallerkene", // Select apple and the agurk on the plates
    selector : "tallerken :only-child",
    syntax: ":only-child",
    helpTitle: "Enebarn pseudo-selektor", // Only Child Pseudo-selector
    help : "Du kan velge alle elementer som er alene inni et annet. <br /><br />Legg igjen merke til at disse må skrives på engelsk.", // You can selects any element that is the only element inside of another one.
    examples : [
      '<strong>:last-child</strong> velger alle siste-barn-elementer', // selects all last-child elements.
      '<strong>span:first-child</strong> velger alle første-barn <strong>&lt;span&gt;</strong> elementer.', // selects all first-child
      '<strong>ul li:first-child</strong> velger alle første-barn <strong>&lt;li&gt;</strong> elementer som er i en <strong>&lt;ul&gt;</strong>.'
    ],
    board: "(A)(p)[]P(oO)p"
  },
  {
    doThis : "Velg det lille eplet og den lille agurken", // Select the small apple and the agurk
    selector : ".liten:last-child",
    syntax: ":last-child",
    helpTitle: "siste-barn pseudo-selektor", // Last Child Pseudo-selector
    help : "Du kan bruke denne selectoren til å velge elementer som er det siste barnet inni et annet. <br /><br />Proff-tips &rarr; hvis det bare er et element, så teller det både som første-barn (:first-child), enebarn (:only-child) og siste-barn (:last-child)! ", // You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!
    examples : [
      '<strong>:last-child</strong> velger alle siste-barn', // selects all last-child elements.
      '<strong>span:last-child</strong> velger alle siste-barn <strong>&lt;span&gt;</strong> elementer.',
      '<strong>ul li:last-child</strong> velger det siste <strong>&lt;li&gt;</strong> elementet inni en hvilken som helst <strong>&lt;ul&gt;</strong>.'
    ],
    board: "{a)()(oO)p"
  },
  {
    doThis : "Velg den tredje tallerkenen", // Select the 3rd plate
    selector : ":nth-child(3)",
    syntax: ":nth-child(A)",
    helpTitle: "Ente barn-element selektor", // Nth Child Selector
    help : "Velger det <strong>ente</strong> (F.eks.: 1st, 3rd, 12th etc.) barne-elementet inni et annet element.",
    examples : [
      '<strong>:nth-child(8)</strong> velger hvert element som er det åttende barnet av et annet. ', // selects every element that is the 8th child of another element.
      '<strong>div p:nth-child(2)</strong> velger den andre <strong>&lt;p&gt;</strong>\'n i alle <strong>&lt;div&gt;</strong>-tagger.',
    ],
    board: "()()(){}"
  },
  {
    doThis : "Velg den første bentoboksen", // Select the 1st bento
    selector : "bento:nth-last-child(4)",
    syntax: ":nth-last-child(A)",
    helpTitle: "Ente siste-barn selektor", // Nth-Last Child Selector
    help : "Velger det siste barnet av en forelder. Dette er som med ente-barn, men vi teller bakfra!", // Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!
    examples : [
      '<strong>:nth-last-child(2)</strong> velger alle nest-siste barn-element.' // selects all second-to-last child elements
    ],
    board: "()[]a(OOO)[]"
  },
  {
    doThis : "Velg det første eplet", //Select first apple
    selector : "eple:first-of-type",
    syntax: ":first-of-type",
    helpTitle: "Føste av typen-selektor", // First of Type Selector
    help : "Velger det første elementet av typen inni et annet.", // Selects the first element of that type within another element.
    examples : [
      '<strong>span:first-of-type</strong> velger det første <strong>&lt;span&gt;</strong> i et hvilket som helst element. ' // selects the first <strong>&lt;span&gt;</strong> in any element.
    ],
    board: "Aaaa(oO)"
  },
  {
    doThis: "Velg alle partalls-tallerkenen", // Select all even plates
    helpTitle: "Ente-av-typen selektor", // Nth-of-type Selector
    selector: "tallerken:nth-of-type(even)",
    syntax: ":nth-of-type(A)",
    help: "Velger et konkret tall, eller partall/oddetall (even/odd).", // Selects a specified number, or even/odd instances
    examples: [
      '<strong>div:nth-of-type(2)</strong> velger den andre instansen av en <strong>div</strong>.', //  selects the second instance of a div
      '<strong>.eksempel:nth-of-type(odd)</strong> velger alle oddetalls-instanser med .eksempel-klassen.' // selects all odd instances of a the example class
    ],
    board: "()(){}()(){}"
  },
  {
    doThis : "Velg eplet på den midterste tallerkenen", // Select the apple on the middle plate.
    helpTitle: "Eneste-av-typen selektor", // Only of Type Selector
    selector : "eple:only-of-type",
    syntax: ":only-of-type",
    help : "Velger det eneste elementet av sin type inni et annet.", // Selects the only element of its kind within another element.
    examples : [
      '<strong>p span:only-of-type</strong> velger en <strong>&lt;span&gt;</strong> inni en <strong>&lt;p&gt;</strong> hvis den er den eneste <strong>&lt;span&gt;</strong> inni der.'
    ],
    board: "(aA)(a)(p)"
  },

  {
    doThis : "Velg den andre eplet og den andre appelsinen", // Select the second apple and orange
    helpTitle: "Siste-av-typen selektor", //Last of Type Selector
    selector : ".liten:last-of-type",
    syntax: ":last-of-type",
    help : "Velger det siste elementet av den typen inni et annet element. Husk at type refererer til HTML-tagg-typen, slik at <strong>&ltp&gt;</strong> og <strong>&ltspan&gt;</strong> er ulike typer. <br /><br />Jeg lurer på om dette er slik den siste dinosauren ble valgt, før den døde ut... ",// Selects each last element of that type within another element. Remember type refers the kind of tag, so &ltp&gt; and &ltspan&gt; are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.
    examples : [
      '<strong>div:last-of-type</strong> velger den siste <strong>&lt;div&gt;</strong> i alle elementer.',
      '<strong>p span:last-of-type</strong> velger den siste <strong>&lt;span&gt;</strong>  i alle <strong>&lt;p&gt;</strong>-elementer.'
    ],
    board: "ooPPaa"
  },
  {
    doThis: "Velg alle tallerkenen fra og med den fremte", // Select every plate from the 5th
    helpTitle: "Ente-av-typen selektor med formel", // Nth-of-type Selector with formula
    selector: "tallerken:nth-of-type(1n+5)",
    syntax: ":nth-of-type(An+B)",
    help: "Ente-av-typen med formel indikerer en syklus-størrelse og en offset fra hvor vi begynner å telle. ", //The nth-of-type formula indicates a cycle size and offset from which to start counting.
    examples: [
      '<strong>span:nth-of-type(6n+2)</strong> velger hver sjette instans av <strong>&lt;span&gt;</strong>, fra og med det andre instanset.'//<strong>span:nth-of-type(6n+2)</strong> selects every 6th instance of a span, starting from the second instance.
    ],
    board: "()(){}()(){}(){}()"
  },
  {
    doThis : "Velg de tomme bentoboksene", // Select the empty bentos
    helpTitle: "Tom-selektor", // Empty Selector
    selector : "bento:empty",
    syntax: ":empty",
    help : "Velger elementer som ikke har noen andre elementer inni seg.", // Selects elements that don't have any other elements inside of them.
    examples : [
      '<strong>div:empty</strong> velger alle tomme <strong>&lt;div&gt;</strong> elementer.'
    ],
    board: "[][p][][]"
  },
  {
    doThis : "Velg de store eplene", // Select the big apples
    selector : "eple:not(.liten)",
    syntax: ":not(X)",
    helpTitle: "Negasjon pseudo-selektor", // Negation Pseudo-class
    help : 'Du kan bruke dette til å velge alle elementer som ikke matcher selektoten <strong>"X"</strong>.', // You can use this to select all elements that do not match selector
    examples : [
      '<strong>:not(#fancy)</strong> velger alle elementer som ikke har <strong>id="fancy"</strong>.', // selects all elements that do not have
      '<strong>div:not(:first-child)</strong> velger alle <strong>&lt;div&gt;</strong> som ikke er et første barn.', //that is not a first child
      '<strong>:not(.stor, .medium)</strong> velger alle elementer som ikke har <strong>class="stor"</strong> eller <strong>class="medium"</strong>.' //selects all elements that do not have
    ],
    board: "{a}(A)A(o)p"
  }
];
