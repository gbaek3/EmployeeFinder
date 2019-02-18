let employeeList = require('../data/employees.js')

module.exports = function (app) {

    app.get('/api/employees', function (req, res) {
        res.json(employeeList);
    });

    app.post('/api/employees', function (req, res) {
        const bestMatch = {
            name: '',
            photo: '',
            difference: Infinity
        };

        const newSurvey = req.body;
        const newScores = newSurvey.scores;

        let totalDiff;
        for (let i = 0; i < employeeList.length; i++) {
            const currentEmployee = employeeList[i];
            totalDiff = 0;
            for (let j = 0; j < currentEmployee.scores.length; j++) {
                const currentEmpScore = currentEmployee.scores[j];
                const newEmpScore = newScores[j];

                totalDiff += Math.abs(parseInt(currentEmpScore) - parseInt(newEmpScore));
            }
            if (totalDiff <= bestMatch.difference) {
                bestMatch.name = currentEmployee.name;
                bestMatch.photo = currentEmployee.photo;
                bestMatch.difference = totalDiff;
            }
        }
        res.json(bestMatch);
        employeeList.push(newSurvey);
    });
}