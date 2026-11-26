from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Criar banco
banco = sqlite3.connect("voz.db")
banco.execute("""
CREATE TABLE IF NOT EXISTS publicacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    titulo TEXT,
    descricao TEXT
)
""")
banco.close()


# Abrir página
@app.route("/")
def inicio():
    with open("index.html", encoding="utf-8") as arquivo:
        return arquivo.read()


# Salvar publicação
@app.route("/salvar", methods=["POST"])
def salvar():
    dados = request.json

    banco = sqlite3.connect("voz.db")
    banco.execute(
        "INSERT INTO publicacoes (tipo, titulo, descricao) VALUES (?, ?, ?)",
        (dados["tipo"], dados["titulo"], dados["descricao"])
    )
    banco.commit()
    banco.close()

    return jsonify({"mensagem": "Salvo!"})


# Listar publicações
@app.route("/listar")
def listar():
    banco = sqlite3.connect("voz.db")
    dados = banco.execute(
        "SELECT * FROM publicacoes ORDER BY id DESC"
    ).fetchall()
    banco.close()

    return jsonify([
        {"id": p[0], "tipo": p[1], "titulo": p[2], "descricao": p[3]}
        for p in dados
    ])


if __name__ == "__main__":
    app.run(debug=True)