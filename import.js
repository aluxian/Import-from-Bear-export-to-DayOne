const fs = require('fs');
const moment = require('moment');
const cp = require('child_process');

// rename .bearbk to .zip and extract it
// i use the date from my note's title
const notes = fs
  .readdirSync('./BearNotes.bearbk.unzipped')
  // .filter((fileName) => fileName.startsWith('2018'))
  .map((fileName) => ({
    fileName,
    contents: fs.readFileSync(`./BearNotes.bearbk.unzipped/${fileName}/text.txt`, 'utf8'),
    date: moment(fileName.substr(0, 15), 'YYYY-MM-DD HHmm'),
    creationDate: moment(
      require(`./BearNotes.bearbk.unzipped/${fileName}/info.json`)['net.shinyfrog.bear'].creationDate,
    ),
    creationDateRaw: require(`./BearNotes.bearbk.unzipped/${fileName}/info.json`)['net.shinyfrog.bear'].creationDate,
  }));

// console.log(notes);

for (const note of notes) {
  console.log(
    cp
      .execSync(
        `cat './BearNotes.bearbk.unzipped/${note.fileName}/text.txt' | ` +
          `dayone2 new --date '${note.date.format('YYYY-MM-DD HH:mm')}' && ` +
          `mv './BearNotes.bearbk.unzipped/${note.fileName}' ./moved/`,
      )
      .toString(),
  );
}
