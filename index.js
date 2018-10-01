var os = require('os'); //zaimportowanie wbudowanego modułu wewnętrzengo "os" (dostarczonego razem z pakietem instalacyjnym Node.js)
var OSinfo = require('./modules/OSInfo'); //zaimportowanie stworzonego modułu OSinfo z katalogu modules
var EventEmitter = require("events").EventEmitter; //zaimportowanie modułu event i wyciągnięcie zniego klasy EventEmitter


var emitter = new EventEmitter(); //utworzenie obiektu na podstawie klasy EventEmitter
//dodajmy dwa nasłuchiwania na zdarzenia:
emitter.on("beforeCommand", function (instruction) { //zdarzenie - beforeCommand
    console.log('You wrote: ' + instruction + ', trying to run command'); //funkcja, która wykona się przed wystąpieniem zdarzenia
});
emitter.on("afterCommand", function () { //zdarzenie - afterCommand
    console.log('Finished command'); //funkcja, która wykona się po wystąpieniu zdarzenia
});

var fs = require('fs'); //zaimportowanie modułu fs do pobierania informacji o pliku / folderze
// skrypt wyświetlający informacje o obrazku
fs.stat('./cats.jpg', function(err, stats) {
    console.log(stats);
});

//ustawienia odpowiedniego enkodowania przyjmowanych danych
process.stdin.setEncoding('utf-8');
// ustawienie nasłuchiwania na zdarzenia odczytu
process.stdin.on('readable', function() {
    // treść tego co ma się wykonać w momencie odczytania wejścia  
    var input = process.stdin.read(); // metoda .read() ma za zadanie odczytać co użytkownik podał na wejściu
    if(input !== null) { //sprawdzenie czy na wejściu cokolwiek istnieje
        // teraz jest sens cokolwiek wyświetlać
        var instruction = input.toString().trim();
        // odpalanie zdarzenia beforeCommand (z parametrem)
        emitter.emit('beforeCommand', instruction);
        switch (instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;
            case '/process.env':
                process.stdout.write('\nNode.js Version\n')
                process.stdout.write(process.version);
                process.stdout.write('\nOS Version\n');
                process.stdout.write(process.env.OS);
                break;
            case '/getOSinfo':
                OSinfo.print(); //wywołanie funkcji  getOSinfo znajdującej się w zaimportowanym module OSinfo
                break;
            default:
                process.stderr.write('Wrong instruction!\n');
        };
        // emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');
    }
    
});