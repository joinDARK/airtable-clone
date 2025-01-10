export default function transformColumnKey(key: string) {
  if (key == "review_table") return "orders";
  else if (key == "reviewers") return "managers";
  else return key;
}