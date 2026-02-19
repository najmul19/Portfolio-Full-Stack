const asyncHandler = require('../middleware/asyncHandler');
const Testimonial = require('../models/Testimonial');
const ErrorResponse = require('../utils/errorResponse');

exports.getTestimonials = asyncHandler(async (req, res, next) => {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
});

exports.createTestimonial = asyncHandler(async (req, res, next) => {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
});

exports.updateTestimonial = asyncHandler(async (req, res, next) => {
    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: testimonial });
});

exports.deleteTestimonial = asyncHandler(async (req, res, next) => {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    await testimonial.deleteOne();
    res.status(200).json({ success: true, data: {} });
});
