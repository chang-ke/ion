module.exports = {
  'GET /api/test': (req, res) => {
    res.send({
      code: 0,
      data: {
        avatarUrl:
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      },
    });
  },
};
