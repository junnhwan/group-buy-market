package cn.bugstack.infrastructure.dao;

import cn.bugstack.infrastructure.dao.po.GroupBuyActivity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 拼团活动DAO
 */
@Mapper
public interface IGroupBuyActivityDao {

    List<GroupBuyActivity> queryGroupBuyActivityList();

}
