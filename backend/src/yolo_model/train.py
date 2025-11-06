from ultralytics import YOLO

def train_model():
    """
    Train a YOLO model using your dataset.
    """
    model = YOLO("yolov8n.pt")  # start from a base model
    model.train(
        data="backend/src/yolo_model/data/data_english.yaml",
        epochs=100,
        imgsz=640
    )

if __name__ == "__main__":
    train_model()
