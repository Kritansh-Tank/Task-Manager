/**
 * Validate request body for creating a task.
 * Requires: title (non-empty string)
 */
function validateCreateTask(req, res, next) {
    const { title } = req.body;

    if (title === undefined || title === null) {
        return res.status(400).json({
            success: false,
            error: 'Title is required.',
        });
    }

    if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Title must be a non-empty string.',
        });
    }

    next();
}

/**
 * Validate request body for updating a task.
 * Accepts: title (string), completed (boolean) — at least one required.
 */
function validateUpdateTask(req, res, next) {
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
        return res.status(400).json({
            success: false,
            error: 'At least one field (title or completed) is required.',
        });
    }

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Title must be a non-empty string.',
            });
        }
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({
                success: false,
                error: 'Completed must be a boolean.',
            });
        }
    }

    next();
}

module.exports = { validateCreateTask, validateUpdateTask };
