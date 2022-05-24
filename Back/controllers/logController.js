const Logs = require('../models/logModel');

// Gauti visus logus
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Logs.find();
        res.status(200).json({
            status: 'success',
            results: logs.length,
            data: {
                logs: logs
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.addNewLog = async (req, res) => {
    try {
        const newLog = await Logs.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                log: newLog
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
exports.deleteLog = async (req, res) => {
    try {
        await Logs.deleteMany({
            _id: req.body.id
        });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};