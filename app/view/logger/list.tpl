<html>

<head>
  <title>Hacker News</title>
  <style>
    .table {
      width: 100%
    }
  </style>
</head>

<body>
  <table class="table">
    {% for item in list %}
    <tr class="item">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.terminal }}</td>
      <td>
        <pre>{{ item.data }}</pre>
      </td>
      <td>{{ item.create_time }}</td>
    </tr>
    {% endfor %}
  </table>
  {{ result.size }}|
  {{ result.totalElements }}
</body>

</html>