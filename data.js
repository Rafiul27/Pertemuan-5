const fs = require("fs")
const readline = require('readline')

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question("What is your name ? ", (nama) => {
    rl.question("your number mobile ? ", (mobile) => {
        const contact = {nama,mobile};
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts= JSON.parse(file);
        contacts.push(contact);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log("Terima kasih sudah memasukkan data!");
        rl.close();
    });
});