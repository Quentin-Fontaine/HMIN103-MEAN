const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("SUPERVENTES");
    
    /* Creation des index */
    db.collection("films").createIndex( { "titre": 1 }, { unique: true } );
    db.collection("membres").createIndex( { "email": 1 }, { unique: true } );
    
    /* Liste des films */
    app.get("/films", (req,res) => {
        console.log("/films");
        try {
            db.collection("films").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /films : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des films suivant une catégorie */
    app.get("/films/:genre", (req,res) => {
	let genre = req.params.genre;
        console.log("/films/"+genre);
        try {
            db.collection("films").find({genre:genre}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /films/"+genre+" : "+ e);
            res.end(JSON.stringify([]));
        }
    });

    
    /* Liste des genres de films */
    app.get("/genres", (req,res) => {
        console.log("/genres");
	    genres = [];
        try {
            db.collection("films").find().toArray((err, documents) => {
		    for (let doc of documents) {
                if (!genres.includes(doc.genre)) genres.push(doc.genre); 
		    }
            res.end(JSON.stringify(genres));
            });
        } catch(e) {
            console.log("Erreur sur /genres : " + e);
            res.end(JSON.stringify([]));
        }
    });
    
    /* Liste des membres */
    app.get("/membres", (req,res) => {
        console.log("/membres");
        try {
            db.collection("membres").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /membres : " + e);
            res.end(JSON.stringify([]));
        }
    });
    
    /* Inscription */
    app.post("/membre/inscription", (req,res) => {
      try {
        db.collection("membres").insertOne(req.body).then(result => {
          res.end(JSON.stringify({"resultat": 1, "message": "Inscription réussie"}));
        }).catch(error => { 
          res.end(JSON.stringify({"resultat": 0, "message": "Email déjà inscrit !"}));
        });
      } catch (e) {
        res.end(JSON.stringify({"resultat": 0, "message": e}));
      }
    });

    /* Connexion */
    app.post("/membre/connexion", (req,res) => {
        try {
            db.collection("membres")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents != undefined && documents.length == 1)
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });


    /* Afficher panier */
    app.get("/panier", (req, res) => {
        console.log("/panier");
        try {
            db.collection("panier").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur de l'affichage du panier : " + e);
            res.end(JSON.stringify([]));
        }
    });


    /* Ajout d'un produit dans panier */
    app.post("/panier/add", (req,res) => {
        try {
            db.collection("panier").insertOne(req.body);
            res.end(JSON.stringify({"message": "Ajout du produit au panier réussi"}));
        } catch (e) {
            res.end(JSON.stringify({"message": "Problème d'ajout au panier : " + e}));
        }
    });

});


app.listen(8888);
