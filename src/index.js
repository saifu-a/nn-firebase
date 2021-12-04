import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCT4P4LRcwymX0jtE7k7MdeT05cPLWFlGg",
    authDomain: "fir-9-dojo-29342.firebaseapp.com",
    projectId: "fir-9-dojo-29342",
    storageBucket: "fir-9-dojo-29342.appspot.com",
    messagingSenderId: "1000041928389",
    appId: "1:1000041928389:web:2a8e94c2cb7f4ce46c82ac"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'));

// real time collection data
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    });
    console.log(books);
});

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset();
        });
})

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
});

// get a single document
const docRef = doc(db, 'books', 'H6npeOf9uRiNlYiUfBXD')

getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id);
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
})