const Book = require('../Models/bookModels');


exports.findAll = (req, res) => {
    Book.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        }
    );
}

exports.create = async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            read: req.body.read
        });

        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.remove = (req, res) => {
    const id = req.params.id;
    Book.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!` });
            } else {
                res.json({ message: 'Tutorial was deleted successfully!' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}
exports.update = (req, res) => {
    const id = req.params.id;
    Book.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).json({message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}