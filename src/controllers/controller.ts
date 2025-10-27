import type { Request, Response } from 'express';
import logger from '../utils/logger.js';
import {
	createDayLog,
	getAllDayLogs,
	getDayLogById,
	updateDayLog,
	deleteDayLog,
} from "../models/daylog.js";
import { DayLogInputSchema } from '../validation/validation.js';

// GET all day logs
const index = async (_req: Request, res: Response) => {
	logger.info('GET all day logs request received');
	try {
		const logs = await getAllDayLogs();
		res.status(200).json(logs);
	} catch (err) {
		logger.error('Failed to fetch day logs', err);
		res.status(500).json({ error: true, message: "Failed to fetch day logs." });
	}
};

// GET single day log by ID
const dateById = async (req: Request, res: Response) => {
	logger.info(`GET day log by ID request received: id=${req.params.id}`);
	try {
		const id = Number(req.params.id);
		const log = await getDayLogById(id);

		if (!log) {
			logger.warn(`Day log not found: id=${id}`);
			return res.status(404).json({ error: true, message: "Day log not found." });
		}

		return res.status(200).json(log);
	} catch (err) {
		logger.error('Error fetching day log', err);
		return res.status(500).json({ error: true, message: "Error fetching day log." });
	}
};

// CREATE new day log
const newDate = async (req: Request, res: Response) => {
	logger.info('CREATE new day log request received', { body: req.body });
	try {
		const validatedData = DayLogInputSchema.parse(req.body);
		const log = await createDayLog(validatedData);
		res.status(201).json(log);
	} catch (err) {
		logger.error('Error creating new day log', err);
		res.status(500).json({ error: true, message: "Error creating new day log." });
	}
};

// UPDATE existing day log by ID
const editById = async (req: Request, res: Response) => {
	logger.info(`UPDATE day log by ID request received: id=${req.params.id}`, { body: req.body });
	try {
		const id = Number(req.params.id);
		const validatedData = DayLogInputSchema.parse(req.body);
		const log = await updateDayLog(id, validatedData);
		res.status(200).json(log);
	} catch (err) {
		logger.error('Error updating day log', err);
		res.status(500).json({ error: true, message: "Error updating day log." });
	}
};

// DELETE day log by ID
const deleteById = async (req: Request, res: Response) => {
	logger.info(`DELETE day log by ID request received: id=${req.params.id}`);
	try {
		const id = Number(req.params.id);
		await deleteDayLog(id);
		res.status(200).json({ message: "Day log deleted successfully." });
	} catch (err) {
		logger.error('Error deleting day log', err);
		res.status(500).json({ error: true, message: "Error deleting day log." });
	}
};

export default {
	index,
	dateById,
	newDate,
	editById,
	deleteById,
};
