from flask import Flask, render_template

app = Flask(__name__)
app.config.update(dict(
   DEBUG=False
))
@app.route("/")
def index():
    return render_template("./index.html")

if __name__ == '__main__':
    app.run('0.0.0.0', 8080)
