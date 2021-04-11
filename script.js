const array = [];

function Run() {
  let url =
    'https://api.scryfall.com/cards/random?q=legal%3Acommander+-is%3Afunny+-t%3Aland+-identity%3Dc+-is%3Avanilla';
    //legal in Commander and the cards aren’t funny and the card types exclude “land” and the cards don’t have colorless identity and aren't vanilla
  url += '+identity%3A' + getCurrentColors();
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      if (array.includes(res.name) === false) {
        array.push(res.name);

        console.log(res.name);
        document.getElementsByClassName('choose-number')[0].innerHTML = '';
        document.getElementsByClassName('button')[0].innerHTML = '';
        document.getElementsByClassName('count')[0].innerHTML =
          array.length + ' cards';
        document.getElementsByClassName(
          'target',
        )[0].innerHTML = array.sort().join('\n');
      } else Run();
    });
}

function getCurrentColors() {
  let identity = '';

  if (document.getElementById('white').checked) identity += 'w';
  if (document.getElementById('blue').checked) identity += 'u';
  if (document.getElementById('black').checked) identity += 'b';
  if (document.getElementById('red').checked) identity += 'b';
  if (document.getElementById('green').checked) identity += 'g';
  if (identity == '') identity = 'c';

  return identity;
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