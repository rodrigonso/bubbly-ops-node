const express = require('express')
const { Job } = require('../models/job-model')
const  { Employee } = require('../models/employee-model')
const router = express.Router()

router.post('/saveJob/:employeeId', async(req, res) => {

    const currentEmployee = await Employee.findById(req.params.employeeId)
    if (!currentEmployee) res.status(404).send("We did not find a valid employee with given id")

    if (req.body.isCompleted) res.status(400).send("Job is already completed")

    const newJob = await new Job({
        employeeId: req.params.employeeId,
        isCompleted: true,
        date: req.body.date,
        distances: req.body.distances,
        vehicleType: req.body.vehicleType,
        serviceType: req.body.serviceType,
        jobData: {
            description: req.body.jobData.description,
            distances: req.body.jobData.distances,
            end: req.body.jobData.end,
            id: req.body.jobData.id,
            location: req.body.jobData.location,
            start: req.body.jobData.start,
            summary: req.body.jobData.summary,
            start: req.body.jobData.start,
            start: req.body.jobData.start,
            organizer: req.body.jobData.organizer
        },
       
    })
    newJob.save()

    currentEmployee.jobs.push(newJob)
    currentEmployee.save()
    res.send(newJob)
})

router.post('/getJob/:id', async(req, res) => {
    console.log(req.params.id)
    const job = await Job.findOne({ "jobData.id": req.params.id })
    if (job && job.isCompleted) res.send(null)
    if (!job) res.status(200).send(req.body)
    if (job) res.send(req.body)
    res.send(null)
})

router.put('/updateJob/:id', async(req, res) => {
    const job = await Job.findOne({ "jobData.id": req.params.id })
    if (!job) res.status(404).send("No job found with give id")
    if (job && !job.isCompleted) {
        job.vehicleType = req.body.vehicleType
        job.save()
    }
    if (job && job.isCompleted) res.status(400).send("Job has already been completed")
})

router.get('/getJobs/:id', async(req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) res.status(404).send("No employee found with given id")
    res.send(employee.jobs)
})

router.get('/getAllJobs', async(req, res) => {
    const jobs = await Job.find()
    res.send(jobs)
})

router.delete('/deleteJob/:employeeId/:id', async(req, res) => {
    console.log(req.body._id)
    const employee = await Employee.findById(req.params.employeeId)
    if (!employee) res.status(404).send("We couldn't find an employee with the given id")

    const job = employee.jobs.id(req.params.id)
    job.remove()
    employee.save()
    
    const jobs = await Job.findById(req.params.id)
    jobs.remove()
    jobs.save()

    res.send(job)
})

module.exports = router