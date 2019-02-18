$(function () {
    const validate = function () {
        let validSurvey = true;
        $('input').each(function () {
            if (!$(this).val()) {
                validSurvey = false;
            }
        });
        $('.custom-select').each(function (i, element) {
            if (!$(this).val()) {
                validSurvey = false;
            }
        });
        return validSurvey;
    }

    const showModal = function (data) {
        $('#match-name').text(data.name);
        $('#match-img').attr('src', data.photo);
        $('#results-modal').modal('toggle');
    }

    const newEmployeeFinder = function (event) {
        event.preventDefault();
        if (validate()) {
            const newSurvey = {
                name: $('#name').val().trim(),
                photo: $('#photo').val().trim(),
                scores: [
                    $('#q1').val(),
                    $('#q2').val(),
                    $('#q3').val(),
                    $('#q4').val(),
                    $('#q5').val(),
                    $('#q6').val(),
                    $('#q7').val(),
                    $('#q8').val(),
                    $('#q9').val(),
                    $('#q10').val()
                ]
            };
            $.ajax({
                method: 'POST',
                url: 'api/employees',
                data: newSurvey,
                success: showModal
            })
        }
        else {
            $('#error')
                .text("Please complete all fields")
                .addClass('alert-danger')
        }
    }

    $('#submit').on('click', newEmployeeFinder)
});
