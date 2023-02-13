async function getScryfallFull() {
  return (await fetch('https://data.scryfall.io/oracle-cards/oracle-cards-20230212220312.json')).json();
}

function fitsColorIdentiy(arr){
  return (arr, target) => target.every(v => arr.includes(v));
}

const deck = [];
let deckSize = document.getElementById('generateNumber').value
let landCount = Math.floor(deckSize * 0.4)
let spellCount = Math.floor(deckSize * 0.6)

const Run = ()=> {

  let spellList = []

  getScryfallFull()
  .then(res => res.filter(card => card.legalities.commander == 'legal'))
  .then(res => res.filter(card => card.edhrec_rank <= document.getElementById('edhrec_limit').value))
  .then(res => res.filter(card => !card.type_line.includes('Land')))
  .then(res => res.filter(card => card.color_identity.every(color => getCurrentColors().includes(color))))

  .then(allCards => {
    
    while (spellList.length < spellCount && spellList.length < allCards.length) {
      let card = allCards[Math.floor(Math.random() * allCards.length)]
      console.log(card)
      if (spellList.includes(card) == false){
        spellList.push(card)
      }
    }

    deck.push(...spellList)

    decklist = deck.map(obj => obj.name).sort()

    

    document.getElementsByClassName('choose-number')[0].innerHTML = '';
    document.getElementsByClassName('button')[0].innerHTML = '';
    document.getElementsByClassName('count')[0].innerHTML = decklist.length + ' spells';

    addLands()
    document.getElementsByClassName('target',)[0].innerHTML = decklist.join('\n');
  })
}




function getCurrentColors() {
  let identity = [];
  if (document.getElementById('white').checked) identity.push('W');
  if (document.getElementById('blue').checked) identity.push('U');
  if (document.getElementById('black').checked) identity.push('B');
  if (document.getElementById('red').checked) identity.push('R');
  if (document.getElementById('green').checked) identity.push('G');
  if (identity == '') identity.push('C');

  return identity;
}

function addLands() {
  
  let landsInEachColor = Math.floor(landCount / getCurrentColors().length)

  getCurrentColors().forEach(res =>{
    console.log(res)

    if (res == 'W') decklist.push(`${landsInEachColor} Plains`)
    if (res == 'U') decklist.push(`${landsInEachColor} Island`)
    if (res == 'B') decklist.push(`${landsInEachColor} Swamp`)
    if (res == 'R') decklist.push(`${landsInEachColor} Mountain`)
    if (res == 'G') decklist.push(`${landsInEachColor} Forest`)
    if (res == 'C') decklist.push(`${landsInEachColor} Wastes`)

  })
}

function copyTextFromElement(elementID) {
  let element = document.getElementById(elementID); //select the element
  let elementText = element.textContent; //get the text content from the element
  copyText(elementText); //use the copyText function below
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function RunReal() {
  for (let i = 0; i < document.getElementById('generateNumber').value; i++) {
    Run();
  }
}
