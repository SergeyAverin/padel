from datetime import datetime

from fastapi import APIRouter, Body

from match_score.models import MatchScore
from match.models import Match


match_score_router = APIRouter()


@match_score_router.get('/match/{match_id}/match_score')
async def get_all_match_score_by_match(match_id: int):
    match_scores = await MatchScore.filter(match_id=match_id)
    return match_scores


@match_score_router.patch('/match/{match_score_id}/match_score')
async def change_match_score(match_score_id: int, team: int = Body(), score: int = Body()):
    match_score = await MatchScore.get(id=match_score_id)
    if team == 1:
        match_score.first_team_score = score
    elif team == 2:
        match_score.second_team_score = score
    await match_score.save()
    return match_score


@match_score_router.delete('/match/{match_score_id}/match_score')
async def delete_match_score(match_score_id: int):
    match_score = await MatchScore.get(id=match_score_id)
    await match_score.delete()


@match_score_router.post('/match/{match_id}/match_score')
async def create_match_score(match_id: int):
    match = await Match.get(id=match_id)
    match_score = MatchScore()
    match_score.match = match
    match_score.first_team_score = 0
    match_score.second_team_score = 0
    match_score.created_at = datetime.now()
    await match_score.save()
    return match_score
