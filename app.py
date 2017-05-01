from flask import *

app = Flask(__name__)
app.config.update(dict(
   DEBUG=True
))

class User:
	def __init__(self, initials=None):
		self.initials = initials
		self.time_completed = None
		self.completed = False

user = User()

@app.route("/")
def index():
    return render_template("./index.html")

@app.route("/game", methods=['GET', 'POST'])
def game():
	if request.method == 'POST':
		initials = request.form['initials']
		user.initials = initials

	return render_template("./game.html", user=user)


@app.route("/results", methods=['GET', 'POST'])
def results():
	if request.method == 'POST':
		pass
	return render_template("./results.html", user=user)

if __name__ == '__main__':
    app.run('0.0.0.0', 8080)
