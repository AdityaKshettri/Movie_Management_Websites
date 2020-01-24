const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

function closeMovieDeletionModal()
{
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

function deleteMovieHandler(movieId)
{
    let movieIndex = 0;
    for(const movie of movies)
    {
        if(movie.id===movieId)
        {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex,1);
    listRoot.remove(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
}

function startDeleteMovieHandler(movieId)
{
    
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeleteButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeleteButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
    confirmDeleteButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeleteButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeleteButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeleteButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
}

function renderNewMovieElement(id,title,imageUrl,rating)
{
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt=${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}</p>
        </div>
    `;
    newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null, id));
    listRoot.append(newMovieElement);
}

function updateUI()
{
    if(movies.length===0)
    {
        entryTextSection.style.display = 'block';
    }
    else
    {
        entryTextSection.style.display = 'none';
    }
}

function closeMovieModal()
{
    addMovieModal.classList.remove('visible');
}

function toggleBackdrop()
{
    backdrop.classList.toggle('visible');
}

function showMovieModal()
{
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}

function cancelAddMovieHandler()
{
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
}

function addMovieHandler()
{
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if(titleValue.trim()===''||imageUrlValue.trim()===''||ratingValue.trim()===''||+ratingValue<1||+ratingValue>5)
    {
        alert('Please enter valid values (rating between 1 and 5) !!');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
    updateUI();
}

function clearMovieInputs()
{
    for(const userInput of userInputs)
    {
        userInput.value = '';
    }
}

function backdropClickHandler()
{
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
}

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
