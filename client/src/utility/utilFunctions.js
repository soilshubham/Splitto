import axios from 'axios';
import { GetGroup } from '../api';

export const getGroupData = async (groupArray) => {
    let updatedGroupArray = [];
    try {
        for (let i = 0; i < groupArray.length; i++) {
            const groupData = await GetGroup(groupArray[i]);
            updatedGroupArray.push(groupData);
        }
        return updatedGroupArray;
    }
    catch (err) {
        console.log(err);
    }
}