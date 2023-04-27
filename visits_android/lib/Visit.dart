class Visit {
  final int       id;
  final String    visitor;
  final String  entranceDate;
  final String  leavingDate;
  final String    encouteredPerson;
  final String    reasonName;

  const Visit({
    required this.id,
    required this.visitor,
    required this.entranceDate,
    required this.leavingDate,
    required this.encouteredPerson,
    required this.reasonName
  });

  factory Visit.fromJson(Map<String, dynamic> json) {
    return Visit(
      id:                 json['id'],
      visitor:            "${json['firstname']} ${json['lastname']}" ?? "",
      entranceDate:       json['entranceDate'] ?? "",
      leavingDate:        json['leavingDate'] ?? "",
      encouteredPerson:   "${json['encouteredPerson.firstname']} ${json['encouteredPerson.lastname']}" ?? "",
      reasonName:         json['reason.reasonName'] ?? ""
    );
  }
}