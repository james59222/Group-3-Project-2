const router = require('express').Router();
const { Pets, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbPetData = await User.findAll({
            include: [
                {
                    model: Pets,
                    attributes: ['id', 'pet_name','pet_age','species', 'breed', 'gender', 'arrival_date', 'current_date'],
                },
            ],
            
        });

        const pets = dbPetData.map((pet) => 
        pet.get({ plain: true })
        );
            
        
        res.render('homepage', {
            pets,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// GET one pet
router.get('/pet/:id', async (req, res) => {
    try {
      const dbPetData = await User.findByPk(req.params.id, {
        include: [
          {
            model: Pets,
            attributes: [
              'id',
              'pet_name',
              'pet_age',
              'species',
              'breed',
              'gender',
              'arrival_date',
              'current_date'
            ],
          },
        ],
      });

      if (dbPetData === null) {
       res.status(404).json({ error: 'User not found' });
        return;
    }
  
      const petData = dbPetData.get({ plain: true });
      res.render('pet-details', {
        petData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // signup route 

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // renders the signup handlebars
  res.render('signup'); 
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
