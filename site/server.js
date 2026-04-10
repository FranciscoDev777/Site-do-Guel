const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let agendamentos = []

const horariosBase = [
    "08:00", "08:40", "09:20", "10:00",
    "10:40", "11:20", "12:00", "12:40",
    "13:20", "14:00", "14:40", "15:20",
    "16:00", "16:40", "17:20", "18:00",
    "18:40", "19:20", "20:00"
]

// horários livres
app.get("/horarios-livres/:data", (req, res) => {

    const data = req.params.data

    const ocupados = agendamentos
        .filter(a => a.dia === data)
        .map(a => a.horario)

    const livres = horariosBase.filter(h => !ocupados.includes(h))

    res.json(livres)

})

// criar agendamento
app.post("/agendar", (req, res) => {

    const { nome, numero, dia, horario, barbeiro } = req.body

    const ocupado = agendamentos.find(a =>
        a.dia === dia &&
        a.horario === horario &&
        a.barbeiro === barbeiro
    )

    if (ocupado) {
        return res.json({ sucesso: false })
    }

    agendamentos.push({
        nome,
        numero,
        dia,
        horario,
        barbeiro
    })

    console.log("Novo agendamento:", nome, horario)

    res.json({ sucesso: true })

})

// painel barbeiro
app.get("/agendamentos/:barbeiro", (req, res) => {

    const barbeiro = req.params.barbeiro

    const lista = agendamentos.filter(a => a.barbeiro === barbeiro)

    res.json(lista)

})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})