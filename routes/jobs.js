const express = require('express')
const { Job } = require('../models/job-model')
const router = express.Router()


// save new job to db
router.post('/', async(req, res) => {
    const { distances, vehicleType, serviceType, jobData, upgrades, start, date, location, summary, employeeId } = req.body

    if (req.body.isCompleted) res.status(400).send({ msg: "Job is already completed!"})

    const existingJob = await Job.findOne({ "jobData.id": jobData.id })
    if (existingJob) res.status(400).send({ msg: "You have already saved this job to the database!"})

    if (!existingJob) {
        const newJob = await new Job({
            employeeId,
            isCompleted: true,
            distances,
            vehicleType,
            serviceType,
            upgrades,
            start,
            date,
            location,
            summary,
            jobData: {
                description: jobData.description,
                end: jobData.end,
                id: jobData.id,
                location: jobData.location,
                start: jobData.start,
                summary: jobData.summary,
                organizer: jobData.organizer
            }
        })

        newJob.save()
        res.status(200).send(newJob)
    }
})


router.post('/:id', async(req, res) => {
    console.log(req.params.id)
    const job = await Job.findOne({ "jobData.id": req.params.id })
    if (job && job.isCompleted) res.send(null)
    if (!job) res.status(200).send(req.body)
    if (job) res.send(req.body)
    res.send(null)
})

router.get('/', async(req, res) => {
    const jobs = await Job.find().sort({ _id: -1 })
    res.send(jobs)
})

router.delete('/:id', async(req, res) => {    
    const jobs = await Job.findById(req.params.id)
    if (!jobs) res.status(400).send("Error!")

    jobs.remove()
    jobs.save()
    res.status(200).send(job)
})

router.put('/:id', async(req, res) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body)
    if (!job) res.status(400).send("We didn't find a job with the given id")

    job.save()
    res.status(200).send("All good!")
})

module.exports = router