# StockSense AI - FastAPI Main Application
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
from backend.app.api.stocks import router as stocks_router
from backend.app.api.predict import router as predict_router
from backend.app.api.models import router as models_router
from backend.app.database import init_db

# Initialize database schema
init_db()

app = FastAPI(
    title="StockSense AI Backend API",
    description="REST API for AI-Based Stock Market Trend Prediction System (Linear Regression, ARIMA, LSTM)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for React/Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time-Sec"] = f"{process_time:.4f}"
    return response

# Mount routers
app.include_router(stocks_router)
app.include_router(predict_router)
app.include_router(models_router)

@app.get("/api/health", tags=["System"])
def health_check():
    """Health check endpoint for container and uptime monitoring."""
    return {
        "status": "HEALTHY",
        "service": "StockSense AI REST Backend",
        "version": "1.0.0",
        "models_available": ["Linear Regression", "ARIMA", "LSTM"],
        "timestamp": time.time()
    }

@app.get("/", tags=["System"])
def root():
    return {
        "message": "Welcome to StockSense AI REST Backend",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
