<html>

<head>
  <title>日志</title>
  <style>
    .table {
      width: 100%
    }
  </style>
</head>

<body>
  <table class="table">
    <tr class="item">
      <td>状态</td>
      <td>索引</td>
      <td>数量</td>
      <td>大小</td>
      <td>操作</td>
    </tr>
    {% for item in list %}
    <tr class="item">
      <td>{{ item.status }}</td>
      <td>{{ item.index }}</td>
      <td>{{ item['docs.count'] }}</td>
      <td>{{ item['store.size'] }}</td>
      <td>
        <a href="/logs/{{item.index}}">查看</a>
      </td>
    </tr>
    {% endfor %}
  </table>
</body>

</html>