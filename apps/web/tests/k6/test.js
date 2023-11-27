import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  ext: {
    loadimpact: {
      // Project: Default project
      projectID: 3667760,
      // Test runs with the same name groups test runs together.
      name: "WizePrompt Load Test",
    },
  },
};

export default function () {
  http.get("http://44.218.10.199:3000");
  sleep(1);
}
