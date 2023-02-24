import { it, expect, describe } from "vitest";
import hashing from "../../src/util/hasing";

const text = "Night";
const expected = [
  "Tp+NuCQrV+cuALq0ZKL0FmtpQWDmIf79Wq5I6kV+Nzw=",
  "+d9hn1XZxtILJ8W89uyhdVgvtq1rJsF403uTe/FNWos=",
];
describe("Hasing", () => {
  it("cnt: 1", () => {
    expect(hashing.sha256(text, 1)).toBe(expected[0]);
  });
  it("cnt: 2", () => {
    expect(hashing.sha256(text, 2)).toBe(expected[1]);
  });
});
