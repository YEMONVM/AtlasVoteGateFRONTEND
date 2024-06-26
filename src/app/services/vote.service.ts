import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Vote } from '../model/Vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private baseUrl = 'http://localhost:8080/api/admin/votes';
  private backendHost = "http://localhost:8080/api/voter";
  private votingStarted = false;

  private voteingEnded =false;
  private votingStartedKey = 'votingStarted';
  private votingEndedKey ='votingEnded';

  votestarted: boolean | undefined;


  constructor(private http: HttpClient) {}
  


  // Method to set the voting state
  setVotingState(started: boolean) {
    localStorage.setItem(this.votingStartedKey, started ? 'true' : 'false');
    
  }

  setVotingEnded(ended: boolean) {
    localStorage.setItem(this.votingEndedKey, ended ? 'true' : 'false');
  }
  

  // Method to get the voting state
  getVotingState(): boolean {
    const started = localStorage.getItem(this.votingStartedKey);
    return started === 'true';
  }
  

  // Method to get the voting state
  getVotingEnded(): boolean {
    
    const ended = localStorage.getItem(this.votingEndedKey);
    return ended === 'true';
  }
  
  hasVoted(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/voter/votes/${userId}`);
  }
  
  

  createVote(userId: number, partyId: number) {
    return this.http.post<any>(`${this.backendHost}/votes/${userId}/${partyId}`, {});
  }
  getVoteById(id: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/${id}`);
  }

  updateVote(id: number, updatedVote: Vote): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, updatedVote);
  }

  deleteVote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}`);
  }

  getVoteByUserId(userId: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/user/${userId}`);
  }

  countVotesForElectoralParty(partyId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${partyId}`);
  }

  countVotesForAllParties(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/count/all`);
  }

  getWinningParty(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/winningParty`);
  }

  

  updateVotingStartTime(newStartTime: Date): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/updateVotingStartTime`, newStartTime);
  }

  // Method to start the voting process
  startVotingProcess(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/startVotingProcess`, {});
  }

  // Method to pause the voting process
  pauseVotingProcess(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pauseVotingProcess`, {});
  }

  // Method to resume the voting process
  resumeVotingProcess(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/resumeVotingProcess`, {});
  }
  endVote(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/endVotingProcess`, {});
  }

   
  getElectoralParties(): Observable<any> {
    return this.http.get('http://localhost:8080/api/admin/electoralPart');
  }

  // vote.service.ts

clearVotingStatus() {
  this.setVotingEnded(false); // Réinitialise l'état de fin de vote à false
}

  // Method to set the voting state

}