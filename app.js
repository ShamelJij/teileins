$(document).ready(function() {
    $.getJSON('ap1.json', function(data) {
        var examList = $('#exam-list');
        data.forEach(function(exam) {
            var listItem = $('<li class="list-inline-item"><a href="#" class="exam-link" data-year="' + exam.year + '" data-season="' + exam.season + '">' + exam.year + '_' + exam.season + '_' + exam.exam + '</a></li>');
            examList.append(listItem);
        });

        $('.exam-link').click(function(e) {
            e.preventDefault();
            var year = $(this).data('year');
            var season = $(this).data('season');
            var exam = data.find(exam => exam.year == year && exam.season == season);

            if (exam) {
                displayExam(exam);
            }
        });
    });
});

function displayExam(exam) {
    var container = $('.content');
    container.empty();

    var header = $('<h1>' + exam.year + ' ' + exam.season + ' ' + exam.exam + '</h1>');
    var situation = $('<p>' + exam.situation + '</p>');
    container.append(header, situation);

    exam.aufgaben.forEach(function(aufgabe) {
        var aufgabeContainer = $('<div class="aufgabe"></div>');
        var title = $('<h2>' + aufgabe.title + '</h2>');
        aufgabeContainer.append(title);

        aufgabe.subAufgaben.forEach(function(subAufgabe) {
            var subAufgabeContainer = $('<div class="sub-aufgabe"></div>');
            var subTitle = $('<h3>' + subAufgabe.title + '</h3>');
            var description = $('<p>' + subAufgabe.description + '</p>');

            var solutionButton = $('<button class="btn btn-primary show-solution">Lösung zeigen</button>');
            var hideButton = $('<button class="btn btn-secondary hide-solution" style="display:none;">Lösung verbergen</button>');
            var solution = $('<div class="solution" style="display:none;"></div>').append(description);

            solutionButton.click(function() {
                $(this).hide();
                hideButton.show();
                solution.show();
            });

            hideButton.click(function() {
                $(this).hide();
                solutionButton.show();
                solution.hide();
            });

            subAufgabeContainer.append(subTitle, solutionButton, hideButton, solution);

            if (subAufgabe.image) {
                var image = $('<img src="' + subAufgabe.image + '" alt="Aufgabe image" class="img-fluid mt-2">');
                subAufgabeContainer.append(image);
            }

            aufgabeContainer.append(subAufgabeContainer);
        });

        container.append(aufgabeContainer);
    });
}
