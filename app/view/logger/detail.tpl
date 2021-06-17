<html>

<head>
  <title>日志</title>
  <style>
    .table { width: 100%; }
  </style>
</head>

<body>

  <table class="table">
    <tr>
      <td>createTime</td>
      <td>loginName</td>
      <td>method</td>
      <td>ok</td>
      <td>status</td>
      <td>elapsed</td>
      <td>os</td>
      <td>explore</td>
      <td>host</td>
    </tr>
    {% for item in result.content %}
    <tr class="item">
      <td>{{ item.createTime }}</td>
      <td>{{ item.loginName }}</td>
      <td>{{ item.method }}</td>
      <td>{{ item.ok }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.elapsed }} ms</td>
      <td>{{ item.os }}</td>
      <td>{{ item.explore }}</td>
      <td>{{ item.host }}</td>
    </tr>
    {% endfor %}
  </table>

  {% if result.page.number != 1 %}
  <a href="?page={{ result.page.number - 1 }}">上一页</a>
  {% endif %}
  {% if result.page.number < result.page.totalPages %}
  <a href="?page={{ result.page.number + 1 }}">下一页</a>
  {% endif %}
  当前页码：{{ result.page.number }}
  总页数：{{ result.page.totalPages }}
  当前页数据条：{{ result.page.size }}
  总数据条：{{ result.page.totalElements }}

</body>

</html>