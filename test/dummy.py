import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
import random
import time


class RandomValuePublisher(Node):
    def __init__(self):
        super().__init__("random_value_publisher")

        # Create individual publishers for each topic
        self.publisher_nh3 = self.create_publisher(Float32, "/nh3", 10)
        self.publisher_uv = self.create_publisher(Float32, "/uv", 10)
        self.publisher_light_intensity = self.create_publisher(
            Float32, "/light_intensity", 10
        )
        self.publisher_hydrogen = self.create_publisher(Float32, "/hydrogen", 10)
        self.publisher_pressure = self.create_publisher(Float32, "/pressure", 10)
        self.publisher_ec = self.create_publisher(Float32, "/ec", 10)
        self.publisher_ph = self.create_publisher(Float32, "/ph", 10)
        self.publisher_moisture = self.create_publisher(Float32, "/moisture", 10)
        self.publisher_nitrogen = self.create_publisher(Float32, "/nitrogen", 10)
        self.publisher_phosphorus = self.create_publisher(Float32, "/phosphorus", 10)
        self.publisher_potassium = self.create_publisher(Float32, "/potassium", 10)
        self.publisher_monoxide = self.create_publisher(Float32, "/monoxide", 10)
        self.publisher_dioxide = self.create_publisher(Float32, "/dioxide", 10)
        self.publisher_soil_temperature = self.create_publisher(
            Float32, "/soil_temperature", 10
        )
        self.publisher_soil_moisture = self.create_publisher(
            Float32, "/soil_moisture", 10
        )

        # Timer to publish random values periodically
        self.timer = self.create_timer(1.0, self.publish_random_values)

    def publish_random_values(self):
        msg = Float32()

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_nh3.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /nh3")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_uv.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /uv")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_light_intensity.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /light_intensity")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_hydrogen.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /hydrogen")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_pressure.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /pressure")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_ec.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /ec")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_ph.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /ph")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_moisture.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /moisture")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_nitrogen.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /nitrogen")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_phosphorus.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /phosphorus")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_potassium.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /potassium")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_monoxide.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /monoxide")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_dioxide.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /dioxide")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_soil_temperature.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /soil_temperature")

        msg.data = random.uniform(0.0, 100.0)
        self.publisher_soil_moisture.publish(msg)
        self.get_logger().info(f"Published {msg.data:.2f} to /soil_moisture")


def main(args=None):
    rclpy.init(args=args)
    node = RandomValuePublisher()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info("Shutting down node...")
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == "__main__":
    main()

