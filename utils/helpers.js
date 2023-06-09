// function ifEquals  helps us to compare if two things are equal or not ... we can use this function in our views
module.exports = {
    ifEquals:function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    duration: (date) => {
    const arrivalDate = new Date(date);
    const currentDate = new Date();
    const duration = (currentDate - arrivalDate) / (1000 * 60 * 60 * 24);
    return Math.ceil(duration);
    

    },
    format_date:(date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },

    addToFav:(petId) => {

      const response = fetch(`/api/favorites/${petId}`, {
          method: 'POST',
          body: JSON.stringify({petId}),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          console.log('Okay')
          ;
        } else {
          alert('Failed to sign up.');
        }
      }
  
    //
    
  }