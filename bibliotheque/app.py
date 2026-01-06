from chalice import Chalice, Response, CORSConfig
from functools import wraps
import jwt

app = Chalice(app_name='bibliotheque')

cors_config = CORSConfig(
    allow_origin='http://localhost:4200',
    allow_headers=['Authorization', 'Content-Type'],
    max_age=600
)

# ==============================
# CONFIG JWT (TEST / APPRENTISSAGE)
# ==============================

SECRET_KEY = "a-string-secret-at-least-256-bits-long"
ALGORITHM = "HS256"

# ==============================
# DECORATEUR JWT
# ==============================

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        request = app.current_request
        auth_header = request.headers.get("authorization")

        if not auth_header:
            return Response(
                body={"message": "Token manquant"},
                status_code=401
            )

        if not auth_header.startswith("Bearer "):
            return Response(
                body={"message": "Format attendu: Bearer <token>"},
                status_code=401
            )

        token = auth_header.split(" ")[1]

        try:
            jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except jwt.ExpiredSignatureError:
            return Response(
                body={"message": "Token expiré"},
                status_code=401
            )
        except jwt.InvalidTokenError as e:
            return Response(
                body={"message": f"Token invalide: {str(e)}"},
                status_code=401
            )

        return f(*args, **kwargs)

    return decorated

# ==============================
# ROUTE PUBLIQUE (TEST)
# ==============================

@app.route('/public', methods=['GET'], cors=cors_config)
def public_route():
    return {"message": "Route publique OK"}

# ==============================
# ROUTE PROTÉGÉE
# ==============================

@app.route('/protected', methods=['GET'], cors=cors_config)
@token_required
def protected_route():
    return {"message": "Accès autorisé avec token valide"}

# ==============================
# CRUD SIMPLIFIÉ (FAKE DATA)
# ==============================

books = []

@app.route('/books', methods=['POST'], cors=cors_config)
@token_required
def create_book():
    data = app.current_request.json_body

    if not data or "title" not in data:
        return Response(
            body={"message": "title requis"},
            status_code=400
        )

    book = {
        "id": len(books) + 1,
        "title": data["title"]
    }
    books.append(book)

    return {"message": "Livre ajouté", "book": book}

@app.route('/books', methods=['GET'], cors=cors_config)
def list_books():
    return books

@app.route('/books/{book_id}', methods=['PUT'], cors=cors_config)
@token_required
def update_book(book_id):
    data = app.current_request.json_body
    if not data or 'title' not in data:
        return Response(body={'message': 'title requis'}, status_code=400)

    try:
        bid = int(book_id)
    except (TypeError, ValueError):
        return Response(body={'message': 'ID invalide'}, status_code=400)

    for b in books:
        if b['id'] == bid:
            b['title'] = data['title']
            return {'message': 'Livre modifié', 'book': b}

    return Response(body={'message': 'Livre non trouvé'}, status_code=404)

@app.route('/books/{book_id}', methods=['DELETE'], cors=cors_config)
@token_required
def delete_book(book_id):
    try:
        bid = int(book_id)
    except (TypeError, ValueError):
        return Response(body={'message': 'ID invalide'}, status_code=400)

    for idx, b in enumerate(books):
        if b['id'] == bid:
            removed = books.pop(idx)
            return {'message': 'Livre supprimé', 'book': removed}

    return Response(body={'message': 'Livre non trouvé'}, status_code=404)
