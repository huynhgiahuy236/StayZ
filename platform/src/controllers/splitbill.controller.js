const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const splitBillController = {
  addExpense: async (req, res, next) => {
    try {
      const { tripId, payerId, amount, description, splitMethod, memberUserIds } = req.body;

      if (!tripId || !payerId || !amount || !memberUserIds || !Array.isArray(memberUserIds)) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin khoản chi tiêu" });
      }

      const expense = await prisma.splitBillExpense.create({
        data: {
          trip_id: tripId,
          payer_id: payerId,
          amount,
          description: description || "Chi tiêu chuyến đi nhóm",
          split_method: splitMethod || "EQUAL"
        }
      });

      const owedAmountPerMember = (Number(amount) / memberUserIds.length).toFixed(2);
      const sharesData = memberUserIds.map(userId => ({
        expense_id: expense.id,
        user_id: userId,
        owed_amount: owedAmountPerMember,
        is_settled: userId === payerId
      }));

      await prisma.splitBillShare.createMany({
        data: sharesData
      });

      res.status(201).json({
        success: true,
        message: "Thêm khoản chi tiêu nhóm thành công. Đã chia nợ chéo tự động.",
        data: expense
      });
    } catch (err) {
      next(err);
    }
  },

  getTripBalances: async (req, res, next) => {
    try {
      const { tripId } = req.params;
      const expenses = await prisma.splitBillExpense.findMany({
        where: { trip_id: tripId, is_deleted: false },
        include: { shares: true, payer: { select: { id: true, full_name: true, avatar_url: true } } }
      });

      res.status(200).json({ success: true, data: expenses });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = splitBillController;
