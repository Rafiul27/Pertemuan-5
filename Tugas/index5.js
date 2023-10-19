const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataPath = './data/userData.json';

function buatFolderDanFile() {
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }

    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]');
    }
}

function simpanDataKeJSON(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function tambahDataKeJSON(nama, handphone, email) {
    buatFolderDanFile();
    const existingData = JSON.parse(fs.readFileSync(dataPath));
    existingData.push({ nama, handphone, email });
    simpanDataKeJSON(existingData);
}

function inputNama() {
    rl.question("Masukkan nama anda ? ", (inputNama) => {
        if (validator.isLength(inputNama, { min: 3, max: 50 })) {
            const nama = inputNama;
            inputNomorHandphone(nama);
        } else {
            console.log("Nama harus memiliki panjang minimal 3 karakter dan maksimal 50 karakter. Silakan coba lagi.");
            inputNama();
        }
    });
}

function inputNomorHandphone(nama) {
    rl.question("Masukkan Nomor Handphone anda ? ", (inputHandphone) => {
        if (validator.isMobilePhone(inputHandphone, "any")) {
            const handphone = inputHandphone;
            inputEmail(nama, handphone);
        } else {
            console.log("Nomor Handphone tidak valid. Silakan coba lagi.");
            inputNomorHandphone(nama);
        }
    });
}

function inputEmail(nama, handphone) {
    rl.question("Masukkan email anda ? ", (email) => {
        if (validator.isEmail(email)) {
            tambahDataKeJSON(nama, handphone, email);
            console.log(`Data anda telah disimpan. Terima kasih!`);
            rl.close();
        } else {
            console.log("Alamat email tidak valid. Silakan coba lagi.");
            inputEmail(nama, handphone);
        }
    });
}

inputNama();