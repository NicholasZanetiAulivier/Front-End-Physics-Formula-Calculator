let inputForm = document.getElementById('inputForm');

inputForm.addEventListener('submit', calculateResults);

function calculateResults(e) {
    e.preventDefault();
    alert('This is an alert');
}