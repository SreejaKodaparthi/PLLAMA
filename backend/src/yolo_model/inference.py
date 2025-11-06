from ultralytics import YOLO
import sys

def run_inference(image_path):
    """
    Run YOLO inference on a single image.
    """
    model = YOLO("backend/src/yolo_model/weights/best.pt")
    results = model(image_path)
    results.show()   # opens window with detections
    print(results)   # prints prediction summary
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python inference.py <image_path>")
    else:
        run_inference(sys.argv[1])
