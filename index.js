const express = require("express");

const port = process.env.PORT || 3000;
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded()); //navegador envia informações pelo json e vem do body, pegar as informações do body (informações do input), vem do name e cria o json

const listaCachorros = [
  {
    id: 1,
    nome: "Cão-pelado-peruano",
    raca: "America/Peru",
    pelagem: "Sem pelo",
    imagem: "https://t2.ea.ltmcdn.com/pt/razas/2/8/7/cao-pelado-peruano_782_0_300_square.webp",
  },
  {
    id: 2,
    nome: "Lulu da Pomerânia ou spitz-alemão-anão",
    raca: "Europa/Alemanha/Polônia",
    pelagem: "Longo e macio",
    imagem: "https://t1.ea.ltmcdn.com/pt/razas/6/1/0/lulu-da-pomerania_16_0_600.jpg",
  },
  {
    id: 3,
    nome: "Azawakh",
    raca:"Africa/Mali/Niger",
    pelagem: "Curo Liso e Fino",
    imagem: "https://t1.ea.ltmcdn.com/pt/razas/2/5/7/azawakh_752_0_600.jpg",
  },
];

let cachorro = undefined; //deixa no escopo global

//passo2-ejs
app.get("/", (req, res) => {
  res.render("index", { listaCachorros, cachorro }); //render para renderizar a página HTML
});

app.post("/create", (req, res) => {
  const cachorro = req.body; //cria uma const e recebe req.body, o que vier da requisição do cliente ele recebe em cachorro
  cachorro.id = listaCachorros.length + 1;
  listaCachorros.push(cachorro); //listaCachorros é array, push insere um item novo no final do array
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  cachorro = listaCachorros.find((cachorro) => cachorro.id == id);
  res.redirect("/#cadastro");
})

app.post("/update/:id", (req, res) => {
  const id = +req.params.id -1; //+ string -> number, subtraindo um apra pegar a posição do array
  const novoCachorro = req.body; //cachorro que vem do body
  novoCachorro.id = id + 1;
  listaCachorros[id] = novoCachorro;
  cachorro = undefined;//para mostrar o formulário de cadastro
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete listaCachorros[id];
  res.redirect("/#cards");
});

app.listen(port, () =>{
  console.log(`Servidor rodando em http://localhost:${port}`)
}); //ouvir a porta 3000, rodando nessa porta
