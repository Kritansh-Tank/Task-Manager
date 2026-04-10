const request = require('supertest');
const app = require('../index');

describe('Task API', () => {
    let createdTaskId;

    // ---- GET /api/tasks ----
    describe('GET /api/tasks', () => {
        it('should return an array of tasks', async () => {
            const res = await request(app).get('/api/tasks');
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // ---- POST /api/tasks ----
    describe('POST /api/tasks', () => {
        it('should create a new task with valid title', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ title: 'Test Task' });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data.title).toBe('Test Task');
            expect(res.body.data.completed).toBe(false);
            expect(res.body.data).toHaveProperty('createdAt');

            createdTaskId = res.body.data.id;
        });

        it('should return 400 if title is missing', async () => {
            const res = await request(app).post('/api/tasks').send({});
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toBeDefined();
        });

        it('should return 400 if title is empty string', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ title: '   ' });
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 if title is not a string', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ title: 123 });
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    // ---- PATCH /api/tasks/:id ----
    describe('PATCH /api/tasks/:id', () => {
        it('should update task completed status', async () => {
            const res = await request(app)
                .patch(`/api/tasks/${createdTaskId}`)
                .send({ completed: true });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.completed).toBe(true);
        });

        it('should update task title', async () => {
            const res = await request(app)
                .patch(`/api/tasks/${createdTaskId}`)
                .send({ title: 'Updated Title' });

            expect(res.status).toBe(200);
            expect(res.body.data.title).toBe('Updated Title');
        });

        it('should return 400 if no fields provided', async () => {
            const res = await request(app)
                .patch(`/api/tasks/${createdTaskId}`)
                .send({});
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 if completed is not boolean', async () => {
            const res = await request(app)
                .patch(`/api/tasks/${createdTaskId}`)
                .send({ completed: 'yes' });
            expect(res.status).toBe(400);
        });

        it('should return 404 for non-existent task', async () => {
            const res = await request(app)
                .patch('/api/tasks/nonexistent-id')
                .send({ completed: true });
            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });

    // ---- DELETE /api/tasks/:id ----
    describe('DELETE /api/tasks/:id', () => {
        it('should delete an existing task', async () => {
            const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe(createdTaskId);
        });

        it('should return 404 for non-existent task', async () => {
            const res = await request(app).delete('/api/tasks/nonexistent-id');
            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });

    // ---- 404 route ----
    describe('Unknown routes', () => {
        it('should return 404 for unknown routes', async () => {
            const res = await request(app).get('/api/unknown');
            expect(res.status).toBe(404);
        });
    });
});
